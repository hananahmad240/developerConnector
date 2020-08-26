import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSinglePost } from '../../actions/postsAction';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';

class SinglePost extends Component {
	componentDidMount() {
		this.props.getSinglePost(this.props.match.params.id);
	}
	render() {
		const { post, loading } = this.props.posts;
		let postContent;
		if (post === null || loading || Object.keys(post).length === 0) {
			postContent = <Spinner></Spinner>;
		} else {
			postContent = (
				<div>
					<PostItem post={post.data} showActions={false}></PostItem>
					<CommentForm postid={post.data._id}></CommentForm>
					<CommentFeed
						postId={post.data._id}
						comments={post.data.comments}
					></CommentFeed>
				</div>
			);
		}
		return (
			<div className="post">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<Link rel="stylesheet" to="/feed" className="btn btn-light mb-3">
								Back
							</Link>
							{postContent}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

SinglePost.propTypes = {
	getSinglePost: PropTypes.func.isRequired,
	posts: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	posts: state.posts,
});

export default connect(mapStateToProps, { getSinglePost })(SinglePost);
