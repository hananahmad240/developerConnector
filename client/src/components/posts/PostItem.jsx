import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deletePost, addLike, disLike } from '../../actions/postsAction';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

class PostItem extends Component {
	onDelete(id) {
		this.props.deletePost(id);
	}
	onLike(id) {
		this.props.addLike(id);
	}
	onDisLike(id) {
		this.props.disLike(id);
	}
	findUserLike(likes) {
		const { auth } = this.props;
		if (likes.filter((like) => like.user === auth.user._id).length > 0) {
			return true;
		} else {
			return false;
		}
	}

	render() {
		const { post, auth, showActions } = this.props;
		return (
			<div className="posts">
				<div className="card card-body mb-3">
					<div className="row">
						<div className="col-md-2">
							<Link to="/profile">
								<img
									className="rounded-circle d-none d-md-block"
									src={post.avatar}
									alt=""
								/>
							</Link>
							<br />
							<p className="text-center">{post.name}</p>
						</div>
						<div className="col-md-10">
							<p className="lead">{post.text}</p>

							{showActions ? (
								<span>
									{/* like */}
									<button
										type="button"
										className="btn btn-light mr-1"
										onClick={this.onLike.bind(this, post._id)}
									>
										<i
											className={classnames('fas fa-thumbs-up', {
												'text-info': this.findUserLike(post.likes),
											})}
										></i>
										<span className="badge badge-light">
											{post.likes.length}
										</span>
									</button>
									{/* delete like */}
									<button
										type="button"
										className="btn btn-light mr-1"
										onClick={this.onDisLike.bind(this, post._id)}
									>
										<i className="text-secondary fas fa-thumbs-down"></i>
									</button>
									<Link to={`/post/${post._id}`} className="btn btn-info mr-1">
										Comments
									</Link>
									{post.user === auth.user._id ? (
										<button
											className="btn btn-danger mr-1"
											type="button"
											onClick={this.onDelete.bind(this, post._id)}
										>
											<i className="fas fa-times" />
										</button>
									) : null}
								</span>
							) : null}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

PostItem.propTypes = {
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	deletePost: PropTypes.func.isRequired,
	addLike: PropTypes.func.isRequired,
	disLike: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
	auth: state.auth,
});
export default connect(mapStateToProps, { deletePost, addLike, disLike })(
	PostItem
);
