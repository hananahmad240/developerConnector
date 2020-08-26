import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addComment } from '../../actions/postsAction';

import PropTypes from 'prop-types';
import classnames from 'classnames';

class CommentForm extends Component {
	constructor() {
		super();
		this.state = {
			text: '',
			errors: {},
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.error) {
			this.setState({ errors: nextProps.error });
		}
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onSubmit(e) {
		e.preventDefault();
		const { user } = this.props.auth;
		const { postid } = this.props;
		const newComment = {
			text: this.state.text,
			name: user.name,
			avatar: user.avatar,
		};
		this.props.addComment(postid, newComment);
		console.log(newComment);
		this.setState({ text: '' });
	}

	render() {
		const { errors } = this.state;
		return (
			<div className="post-form mb-3">
				<div className="card card-info">
					<div className="card-header bg-info text-white">Say Somthing...</div>
					<div className="card-body">
						<form noValidate onSubmit={this.onSubmit}>
							<div className="form-group">
								<textarea
									className={classnames('form-control form-control-lg', {
										'is-invalid': errors.text,
									})}
									placeholder="Create a comment"
									name="text"
									value={this.state.text}
									onChange={this.onChange}
								></textarea>
								{errors.text && (
									<div className="is-invalid invalid-feedback">
										{errors.text}
									</div>
								)}
							</div>
							<button type="submit" className="btn btn-dark">
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

CommentForm.propTypes = {
	addComment: PropTypes.func.isRequired,
	posts: PropTypes.object.isRequired,
	error: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	postid: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
	posts: state.posts,
	error: state.error,
	auth: state.auth,
});

export default connect(mapStateToProps, { addComment })(CommentForm);
