import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { loginUser } from '../../actions/authAction';

class Login extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
			errors: {},
		};

		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		if (this.props.auth.isAuthenticate) {
			this.props.history.push('/dashboard');
		}
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.auth.isAuthenticate) {
			this.props.history.push('/dashboard');
		}

		if (nextProps.error) {
			this.setState({ errors: nextProps.error });
		}
	}

	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value,
		});
	}

	onSubmit(e) {
		e.preventDefault();
		const user = {
			email: this.state.email,
			password: this.state.password,
		};

		this.props.loginUser(user);
	}

	render() {
		const { errors } = this.state;
		return (
			<div className="login">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Log In</h1>
							<p className="lead text-center">
								Sign in to your DevConnector account
							</p>
							<form onSubmit={this.onSubmit}>
								<div className="form-group">
									<input
										type="email"
										className={classnames('form-control form-control-lg', {
											'is-invalid': errors.email,
										})}
										placeholder="Email Address"
										name="email"
										value={this.state.email}
										onChange={this.onChange}
									/>
									{errors.email && (
										<div className="is-invalid invalid-feedback">
											{errors.email}
										</div>
									)}
								</div>
								<div className="form-group">
									<input
										type="password"
										className={classnames('form-control form-control-lg', {
											'is-invalid': errors.password,
										})}
										placeholder="Password"
										name="password"
										value={this.state.password}
										onChange={this.onChange}
									/>
									{errors.password && (
										<div className="is-invalid invalid-feedback">
											{errors.password}
										</div>
									)}
								</div>
								<input type="submit" className="btn btn-info btn-block mt-4" />
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Login.propTypes = {
	loginUser: PropTypes.func.isRequired,
	error: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStatetoProps = (state) => ({
	error: state.error,
	auth: state.auth,
});

export default connect(mapStatetoProps, { loginUser })(Login);