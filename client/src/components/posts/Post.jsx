import React, { Component } from 'react';
import Spinner from '../layout/Spinner';
import { getAllPosts } from '../../actions/postsAction';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddPost from './AddPost';
import PostsFeed from './PostsFeed';

class Post extends Component {
	componentDidMount() {
		this.props.getAllPosts();
	}
	render() {
		const { posts, loading } = this.props.posts;
		let postContent;
		if (posts === null || loading) {
			postContent = <Spinner></Spinner>;
		} else {
			postContent = <PostsFeed posts={posts}></PostsFeed>;
		}
		return (
			<div className="feed">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<AddPost></AddPost>
							{postContent}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Post.propTypes = {
	getAllPosts: PropTypes.func.isRequired,
	posts: PropTypes.object.isRequired,
	error: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	posts: state.posts,
	error: state.error,
	auth: state.auth,
});
export default connect(mapStateToProps, { getAllPosts })(Post);
