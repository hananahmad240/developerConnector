import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPost } from '../../actions/postsAction';

import PropTypes from 'prop-types';
import classnames from 'classnames';

class AddPost extends Component {
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
	componentDidMount() {}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onSubmit(e) {
		e.preventDefault();
		const { user } = this.props.auth;
		const newPost = {
			text: this.state.text,
			name: user.name,
			avatar: user.avatar,
		};
		this.props.addPost(newPost);
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
									placeholder="Create a post"
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

AddPost.propTypes = {
	addPost: PropTypes.func.isRequired,
	posts: PropTypes.object.isRequired,
	error: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	posts: state.posts,
	error: state.error,
	auth: state.auth,
});

export default connect(mapStateToProps, { addPost })(AddPost);
