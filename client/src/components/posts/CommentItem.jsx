import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class CommentItem extends Component {
	render() {
		const { comment, postId } = this.props;
		return (
			<div className="comments">
				<div className="card card-body mb-3">
					<div className="row">
						<div className="col-md-2">
							<Link to="/profile">
								<img
									className="rounded-circle d-none d-md-block"
									src={comment.avatar}
									alt=""
								/>
							</Link>
							<br />
							<p className="text-center">{comment.name}</p>
						</div>
						<div className="col-md-10">
							<p className="lead">{comment.text}</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

CommentItem.propTypes = {
	comment: PropTypes.array.isRequired,
	postId: PropTypes.string.isRequired,
};
export default CommentItem;
