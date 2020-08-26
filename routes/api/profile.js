const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../../db/models/User');
const Profile = require('../../db/models/Profile');
const valiadateProfile = require('../../validations/profile');
const validateExperience = require('../../validations/experience');
const validateEducation = require('../../validations/education');
const {
    use
} = require('passport');

// create route
const route = express.Router();
// ----------------------------------------/api/profile/------------------------------------------------

// 1 GET /api/profile
// get current profile of user who logged in
// private

route.get('/', passport.authenticate('jwt', {
    session: false
}), async (req, res) => {

    const errors = {};

    try {
        const userProfile = await Profile.findOne({
            user: req.user._id
        }).populate('user', ['name', 'avatar']);
        if (!userProfile) {
            errors.noprofile = "there is no profile for this user";
            return res.status(400).json({
                errors
            })
        } else {
            return res.status(200).json({
                data: userProfile
            });
        }
    } catch (error) {
        return res.status(400).json({
            errors
        })
    }
})




// 2 POST /api/profile
// add profile user who logged in
// private

route.post('/', passport.authenticate('jwt', {
    session: false
}), async (req, res) => {
    const {
        errors,
        isValid
    } = valiadateProfile(req.body);
    if (!isValid) {
        return res.status(400).json({
            errors
        })
    } else {
        const profileFields = {};
        profileFields.user = req.user._id;
        const {
            handle,
            company,
            website,
            location,
            status,
            skills,
            bio,
            githubusername,
            youtube,
            twitter,
            facebook,
            instgram,
            linkedin
        } = req.body;

        if (handle) profileFields.handle = handle;
        if (company) profileFields.company = company;
        if (website) profileFields.website = website;
        if (location) profileFields.location = location;
        if (status) profileFields.status = status;
        if (bio) profileFields.bio = bio;
        if (githubusername) profileFields.githubusername = githubusername;
        if (typeof skills !== 'undefined') {
            profileFields.skills = skills.split(',');
        }
        profileFields.social = {};
        if (youtube) profileFields.social.youtube = youtube;
        if (twitter) profileFields.social.twitter = twitter;
        if (facebook) profileFields.social.facebook = facebook;
        if (instgram) profileFields.social.instgram = instgram;
        if (linkedin) profileFields.social.linkedin = linkedin;


        try {
            const userProfile = await Profile.findOne({
                user: req.user._id
            });
            if (userProfile) {
                // update
                const updateProfile = await Profile.findOneAndUpdate({
                    user: req.user._id
                }, profileFields, {
                    new: true,
                    runValidators: true
                })
                return res.status(200).json({
                    data: updateProfile
                });
            } else {
                // create
                let creatProfile = await Profile.findOne({
                    handle: profileFields.handle
                });
                if (creatProfile) {
                    // if handle is already exits
                    errors.handle = 'That handle is already exits';
                    return res.status(400).json({
                        errors
                    });
                } else {
                    creatProfile = await Profile.create(profileFields)
                }

            }
        } catch (err) {
            res.send(400).json({
                err
            });

        }
    }
})




// 3 GET /api/profile/handle/:handle
// get profile by handle
// public
route.get('/handle/:handle', async (req, res) => {
    const errors = {};

    try {
        const userProfile = await Profile.findOne({
            handle: req.params.handle
        }).populate('user', ['name', 'avatar']);
        if (!userProfile) {
            // if user profile doesnot exits
            errors.noprofile = "There is no profile for this user";
            return res.status(400).json({
                msg: errors
            })
        } else {
            return res.status(200).json({
                data: userProfile
            });
        }
    } catch (err) {
        return res.status(400).json({
            msg: err
        });
    }
})



// 4 GET /api/profile/user/:user_id
// get profile by user id
// public
route.get('/user/:user_id', async (req, res) => {
    const errors = {};

    try {
        const userProfile = await Profile.findOne({
            user: req.params.user_id
        }).populate('user', ['name', 'avatar']);
        if (!userProfile) {
            // if user profile doesnot exits
            errors.noprofile = "There is no profile for this user";
            return res.status(400).json({
                msg: errors
            })
        } else {
            return res.status(200).json({
                data: userProfile
            });
        }
    } catch (err) {
        return res.status(400).json({
            msg: err
        });
    }
});



// 5 GET /api/profile/all
// get all profile
// public
route.get('/all', async (req, res) => {
    try {
        const profile = await Profile.find().populate('user', ['name', 'avatar']);
        return res.status(200).json({
            data: profile
        });
    } catch (err) {
        return res.status(400).json({
            err
        });
    }
})




// 6  POST /api/profile/experience
// add experience
// private

route.post('/experience', passport.authenticate('jwt', {
    session: false
}), async (req, res) => {
    const {
        errors,
        isValid
    } = validateExperience(req.body);
    if (!isValid) {
        return res.status(400).json({
            errors
        });
    } else {
        try {
            let userProfile = await Profile.findOne({
                user: req.user._id
            });

            if (!userProfile) {
                errors.noprofile = 'There is no profile';
                return res.status(400).json({
                    errors
                });
            } else {
                const {
                    title,
                    company,
                    location,
                    from,
                    to,
                    current,
                    description
                } = req.body;

                const newExp = {
                    title,
                    company,
                    location,
                    from,
                    to,
                    current,
                    description
                };
                userProfile.experience.unshift(newExp);

                userProfile = await userProfile.save();

                return res.status(200).json({
                    data: userProfile
                });
            }
        } catch (err) {
            return res.status(400).json({
                err
            });

        }
    }
});


// 7  POST /api/profile/education
// add education
// private

route.post('/education', passport.authenticate('jwt', {
    session: false
}), async (req, res) => {
    const {
        errors,
        isValid
    } = validateEducation(req.body);
    if (!isValid) {
        return res.status(400).json({
            errors
        });
    } else {
        try {
            let userProfile = await Profile.findOne({
                user: req.user._id
            });

            if (!userProfile) {
                errors.noprofile = 'There is no profile';
                return res.status(400).json({
                    errors
                });
            } else {
                const {
                    school,
                    degree,
                    fieldofstudy,
                    from,
                    to,
                    current,
                    description
                } = req.body;

                const newEdu = {
                    school,
                    degree,
                    fieldofstudy,
                    from,
                    to,
                    current,
                    description
                };
                userProfile.education.unshift(newEdu);

                userProfile = await userProfile.save();

                return res.status(200).json({
                    data: userProfile
                });
            }
        } catch (err) {
            return res.status(400).json({
                err
            });

        }
    }
});




// 8 POST /api/profile/experience/:exp_id
// delete experience from login user
// private

route.delete('/experience/:exp_id', passport.authenticate('jwt', {
    session: false
}), async (req, res) => {
    let errors = {};
    try {
        let userProfile = await Profile.findOne({
            user: req.user._id
        });
        if (!userProfile) {
            errors.noprofile = 'User has no Profile';
            return res.status(400).json({
                errors
            })
        } else {
            const removeIndex = userProfile.experience.map((item) => item._id).indexOf(req.params.exp_id);
            if (removeIndex >= 0) {
                userProfile.experience.splice(removeIndex, 1);
                userProfile = await userProfile.save();
            }


            return res.status(200).json({
                data: userProfile
            });

        }
    } catch (error) {
        return res.status(400).json({
            error
        });

    }
})





// 8 POST /api/profile/education/:edu_id
// delete education from login user
// private

route.delete('/education/:edu_id', passport.authenticate('jwt', {
    session: false
}), async (req, res) => {
    let errors = {};
    try {
        let userProfile = await Profile.findOne({
            user: req.user._id
        });
        if (!userProfile) {
            errors.noprofile = 'User has no Profile';
            return res.status(400).json({
                errors
            })
        } else {
            const removeIndex = userProfile.education.map((item) => item._id).indexOf(req.params.edu_id);
            console.log(removeIndex);

            if (removeIndex >= 0) {
                userProfile.education.splice(removeIndex, 1);
                userProfile = await userProfile.save();
            }


            return res.status(200).json({
                data: userProfile
            });

        }
    } catch (error) {
        return res.status(400).json({
            msg: error
        });

    }
});





// 9 POST /api/profile/
// delete user and profile
// private

route.delete('/', passport.authenticate('jwt', {
    session: false
}), async (req, res) => {
    let errors = {};
    try {


        let userProfile = await Profile.findOne({
            user: req.user._id
        });
        if (!userProfile) {
            errors.noprofile = 'User has no profile';
            return res.status(400).json({
                errors
            });
        } else {
            Profile.findOneAndRemove({
                user: req.user._id
            }).then(() => {
                User.findOneAndRemove({
                    _id: req.user._id
                }).then(() => {
                    return res.status(200).json({
                        success: true,
                        msg: 'user is deleted'
                    });
                })
            });

        }


    } catch (error) {
        return res.status(400).json({
            error
        });

    }
})

module.exports = route;