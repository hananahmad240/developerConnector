const express = require('express');
const Post = require('../../db/models/Post');
const Profile = require('../../db/models/Profile');
const postValidation = require('../../validations/posts');
const commentValidator = require('../../validations/comment');
const passport = require('passport');
// create route
const route = express.Router();

// 1 POST /api/posts
// create new posts
// private

route.post(
    '/',
    passport.authenticate('jwt', {
        session: false,
    }),
    async (req, res, next) => {
        const {
            errors,
            isValid
        } = postValidation(req.body);

        if (!isValid) {
            return res.status(400).json({
                errors,
            });
        } else {
            try {
                req.body.user = req.user._id;
                const {
                    text,
                    name,
                    avatar,
                    user
                } = req.body;

                const newPost = await Post.create({
                    text,
                    name,
                    avatar,
                    user,
                });

                return res.status(200).json({
                    data: newPost,
                });
            } catch (error) {
                return res.status(400).json({
                    errors
                });
            }
        }
    }
);

// 2 GET /api/posts
// get all posts
// public

route.get('/', async (req, res) => {
    try {
        const allPosts = await Post.find().sort({
            data: -1,
        });
        return res.status(200).json({
            data: allPosts,
        });
    } catch (error) {
        return res.status(400).json({
            error,
        });
    }
});

// 3 GET /api/posts/:post_id
// get single post
// public
route.get('/:post_id', async (req, res) => {
    let errors = {};
    try {
        const singlePost = await Post.findById(req.params.post_id);
        if (!singlePost) {
            errors.noPost = 'no post';
            return res.status(400).json({
                errors,
            });
        } else {
            return res.status(200).json({
                data: singlePost,
            });
        }
    } catch (error) {
        return res.status(400).json({
            msg: 'no post',
        });
    }
});

// 4 delete /api/posts/:post_id
// delete post
// private
route.delete(
    '/:post_id',
    passport.authenticate('jwt', {
        session: false,
    }),
    async (req, res) => {
        let errors = {};
        try {
            // check if user has profile
            let userPost = await Profile.findOne({
                user: req.user._id,
            });
            if (!userPost) {
                errors.noProfile = 'User has no profile';
                return res.status(400).json({
                    errors,
                });
            } else {
                userPost = await Post.findById(req.params.post_id);
                if (!userPost) {
                    errors.noPost = 'no post found';
                    return res.status(400).json({
                        errors,
                    });
                } else {
                    if (userPost.user.toString() !== req.user.id) {
                        console.log(userPost.user.toString());
                        console.log(req.user.id);

                        return res.status(401).json({
                            notauthorized: 'you are unauthorized',
                        });
                    } else {
                        userPost.remove().then(() =>
                            res.status(200).json({
                                success: true,
                            })
                        );
                    }
                }
            }
        } catch (error) {
            return res.status(400).json({
                error
            });
        }
    }
);

// 5 /api/profile/like/:post_id
// add like
// private

route.post(
    '/like/:post_id',
    passport.authenticate('jwt', {
        session: false,
    }),
    async (req, res) => {

        // check if user has profile
        Profile.findOne({
                user: req.user._id,
            })
            .then((profile) => {
                if (!profile) {
                    return res.status(400).json({
                        noprofile: 'user has no profile',
                    });
                } else {
                    // check if id of post exits
                    Post.findById(req.params.post_id)
                        .then((post) => {
                            // console.log(post);

                            if (
                                post.likes.filter(
                                    (like) => like.user.toString() === req.user.id
                                ).length > 0
                            ) {
                                return res.status(400).json({
                                    alreadyLiked: 'user already like this',
                                });
                            } else {
                                post.likes.unshift({
                                    user: req.user._id,
                                });

                                post
                                    .save()
                                    .then((data) => {
                                        return res.status(200).json({
                                            success: true,
                                        });
                                    })
                                    .catch((err) => console.log(err));
                            }
                        })
                        .catch((err) => {
                            return res.status(400).json({
                                postnotfound: 'no post found',
                            });
                        });
                }
            })
            .catch((err) => {
                return res.status(400).json({
                    noprofile: 'user has no profile',
                });
            });

    }
);

// 6 /api/profile/dislike/:post_id
// post dislike the post
// private

route.post(
    '/dislike/:post_id',
    passport.authenticate('jwt', {
        session: false,
    }),
    async (req, res) => {
        try {
            // check if user has profile
            Profile.findOne({
                    user: req.user._id,
                })
                .then((profile) => {
                    if (!profile) {
                        return res.status(400).json({
                            noprofile: 'user has no profile',
                        });
                    } else {
                        // check if id of post exits
                        Post.findById(req.params.post_id)
                            .then((post) => {
                                // console.log(post);

                                if (
                                    post.likes.filter(
                                        (like) => like.user.toString() === req.user.id
                                    ).length === 0
                                ) {
                                    return res.status(400).json({
                                        disLiked: 'user not liked this post',
                                    });
                                } else {
                                    const removeIndex = post.likes
                                        .map((like) => like.user.toString())
                                        .indexOf(req.user.id);
                                    // console.log(removeIndex);

                                    post.likes.splice(removeIndex, 1);
                                    post.save().then(() => {
                                        return res.status(200).json({
                                            post,
                                        });
                                    });
                                }
                            })
                            .catch((err) => {
                                return res.status(400).json({
                                    postnotfound: 'no post found',
                                });
                            });
                    }
                })
                .catch((err) => {
                    return res.status(400).json({
                        noprofile: 'user has no profile',
                    });
                });
        } catch (error) {
            return res.status(400).json({
                msg: 'error',
            });
        }
    }
);

//  7 api/posts/comment/:post_id
// POST add comment to post
// private
route.post(
    '/comment/:post_id',
    passport.authenticate('jwt', {
        session: false
    }),
    async (req, res) => {
        const {
            errors,
            isValid
        } = commentValidator(req.body);
        if (!isValid) {
            return res.status(400).json({
                errors
            });
        } else {
            try {
                let post = await Post.findById(req.params.post_id);
                if (!post) {
                    return res.status(400).json({
                        noPost: 'no post found'
                    });
                } else {
                    req.body.user = req.user.id;
                    const {
                        text,
                        name,
                        avatar,
                        user
                    } = req.body;
                    const newComment = {
                        text,
                        name,
                        avatar,
                        user
                    };
                    post.comments.unshift(newComment);

                    post = await post.save();
                    return res.status(200).json({
                        data: post
                    });
                }
            } catch (err) {
                return res.status(400).json({
                    error: "error"
                });
            }
        }

    }
);






//  8 api/posts/comment/:post_id/:comment_id
// DELETE  comment to post
// private
route.delete(
    '/comment/:post_id/:comment_id',
    passport.authenticate('jwt', {
        session: false
    }),
    async (req, res) => {

        try {
            let post = await Post.findById(req.params.post_id);
            if (!post) {
                return res.status(400).json({
                    noPost: 'no post found'
                });
            } else {

                // check comment exits we want to delet
                // it give us true if post have no comment
                if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length == 0) {
                    return res.status(400).json({
                        msg: "no comment have this post"
                    });
                } else {
                    const removeIndex = post.comments.map(comment => comment._id.toString()).indexOf(req.params.comment_id);
                    post.comments.splice(removeIndex, 1);
                    post = await post.save();

                    return res.status(200).json({
                        data: 'delete comment'
                    });
                }

            }
        } catch (err) {
            return res.status(400).json({
                msg: "error"
            });
        }


    }
);
module.exports = route;