import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import { createProfile, getCurrentProfile } from '../../actions/profileAction';

class CreatProfile extends Component {
	constructor() {
		super();
		this.state = {
			displaySocialInputs: false,
			handle: '', //unique
			company: '',
			website: '',
			location: '',
			status: '',
			skills: '',
			githubusername: '',
			bio: '',
			twitter: '',
			facebook: '',
			linkedin: '',
			youtube: '',
			instagram: '',
			errors: {},
		};

		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		this.props.getCurrentProfile();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.error) {
			this.setState({ errors: nextProps.error });
		}
		if (nextProps.profile.profile) {
			const profile = nextProps.profile.profile.data;
			// console.log(profile);
			const skillsCSV = profile.skills.join(',');
			profile.company = !isEmpty(profile.company) ? profile.company : '';
			profile.website = !isEmpty(profile.website) ? profile.website : '';
			profile.location = !isEmpty(profile.location) ? profile.location : '';
			profile.githubusername = !isEmpty(profile.githubusername)
				? profile.githubusername
				: '';
			profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
			profile.handle = !isEmpty(profile.handle) ? profile.handle : '';
			profile.social = !isEmpty(profile.social) ? profile.social : {};

			profile.twitter = !isEmpty(profile.social.twitter)
				? profile.social.twitter
				: '';
			profile.facebook = !isEmpty(profile.social.facebook)
				? profile.social.facebook
				: '';
			profile.instagram = !isEmpty(profile.social.instagram)
				? profile.social.instagram
				: '';
			profile.linkedin = !isEmpty(profile.social.linkedin)
				? profile.social.linkedin
				: '';
			profile.youtube = !isEmpty(profile.social.youtube)
				? profile.social.youtube
				: '';

			// set state
			this.setState({
				handle: profile.handle,
				company: profile.company,
				website: profile.website,
				location: profile.location,
				status: profile.status,
				skills: skillsCSV,
				githubusername: profile.githubusername,
				bio: profile.bio,
				twitter: profile.twitter,
				facebook: profile.facebook,
				youtube: profile.youtube,
				linkedin: profile.linkedin,
				instagram: profile.instagram,
			});
		}
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onSubmit(e) {
		e.preventDefault();
		const newProfile = {
			handle: this.state.handle,
			status: this.state.status,
			company: this.state.company,
			website: this.state.website,
			location: this.state.location,
			skills: this.state.skills,
			githubusername: this.state.githubusername,
			bio: this.state.bio,
			twitter: this.state.twitter,
			instagram: this.state.instagram,
			facebook: this.state.facebook,
			linkedin: this.state.linkedin,
			youtube: this.state.youtube,
		};
		this.props.createProfile(newProfile, this.props.history);
	}

	render() {
		const { errors } = this.state;
		return (
			<div className="create-profile">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<Link to="/dashboard" className="btn btn-light">
								Go Back
							</Link>
							<h1 className="display-4 text-center">Edit Your Profile</h1>
							<p className="lead text-center">
								Let's get some information to make your profile stand out
							</p>
							<small className="d-block pb-3">* = required field</small>
							<form noValidate onSubmit={this.onSubmit}>
								<div className="form-group">
									<input
										type="text"
										className={classnames('form-control form-control-lg', {
											'is-invalid': errors.handle,
										})}
										placeholder="* Profile handle"
										name="handle"
										value={this.state.handle}
										onChange={this.onChange}
									/>
									{errors.handle && (
										<div className="is-invalid invalid-feedback">
											{errors.handle}
										</div>
									)}
									<small className="form-text text-muted">
										A unique handle for your profile URL. Your full name,
										company name, nickname, etc (This CAN'T be changed later)
									</small>
								</div>

								<div className="form-group">
									<select
										className={classnames('form-control form-control-lg', {
											'is-invalid': errors.status,
										})}
										name="status"
										value={this.state.status}
										onChange={this.onChange}
									>
										<option value="0">* Select Professional Status</option>
										<option value="Developer">Developer</option>
										<option value="Junior Developer">Junior Developer</option>
										<option value="Senior Developer">Senior Developer</option>
										<option value="Manager">Manager</option>
										<option value="Student or Learning">
											Student or Learning
										</option>
										<option value="Instructor">Instructor or Teacher</option>
										<option value="Intern">Intern</option>
										<option value="Other">Other</option>
									</select>
									{errors.status && (
										<div className="is-invalid invalid-feedback">
											{errors.status}
										</div>
									)}
									<small className="form-text text-muted">
										Give us an idea of where you are at in your career
									</small>
								</div>

								<div className="form-group">
									<input
										type="text"
										className="form-control form-control-lg"
										placeholder="Company"
										name="company"
										value={this.state.company}
										onChange={this.onChange}
									/>
									<small className="form-text text-muted">
										Could be your own company or one you work for
									</small>
								</div>

								<div className="form-group">
									<input
										type="text"
										className={classnames('form-control form-control-lg', {
											'is-invalid': errors.website,
										})}
										placeholder="Website"
										name="website"
										value={this.state.website}
										onChange={this.onChange}
									/>
									{errors.website && (
										<div className="is-invalid invalid-feedback">
											{errors.website}
										</div>
									)}
									<small className="form-text text-muted">
										Could be your own or a company website
									</small>
								</div>

								<div className="form-group">
									<input
										type="text"
										className="form-control form-control-lg"
										placeholder="Location"
										name="location"
										value={this.state.location}
										onChange={this.onChange}
									/>
									<small className="form-text text-muted">
										City & state suggested (eg. Boston, MA)
									</small>
								</div>

								<div className="form-group">
									<input
										type="text"
										className={classnames('form-control form-control-lg', {
											'is-invalid': errors.skills,
										})}
										placeholder="Skills"
										name="skills"
										value={this.state.skills}
										onChange={this.onChange}
									/>
									{errors.skills && (
										<div className="is-invalid invalid-feedback">
											{errors.skills}
										</div>
									)}
									<small className="form-text text-muted">
										Please use comma separated values (eg.
										HTML,CSS,JavaScript,PHP)
									</small>
								</div>

								<div className="form-group">
									<input
										type="text"
										className="form-control form-control-lg"
										placeholder="Github Username"
										name="githubusername"
										value={this.state.githubusername}
										onChange={this.onChange}
									/>
									<small className="form-text text-muted">
										If you want your latest repos and a Github link, include
										your username
									</small>
								</div>

								<div className="form-group">
									<textarea
										className="form-control form-control-lg"
										placeholder="A short bio of yourself"
										name="bio"
										value={this.state.bio}
										onChange={this.onChange}
									></textarea>
									<small className="form-text text-muted">
										Tell us a little about yourself
									</small>
								</div>

								<div className="mb-3">
									<button
										type="button"
										className="btn btn-light"
										onClick={() => {
											this.setState((prevState) => ({
												displaySocialInputs: !prevState.displaySocialInputs,
											}));
										}}
									>
										Add Social Network Links
									</button>
									<span className=" ml-4 text-muted">Optional</span>
								</div>

								{this.state.displaySocialInputs && (
									<div className="">
										<div className="input-group mb-3">
											<div className="input-group-prepend">
												<span className="input-group-text">
													<i className="fab fa-twitter"></i>
												</span>
											</div>
											<input
												type="text"
												className={classnames('form-control form-control-lg', {
													'is-invalid': errors.twitter,
												})}
												placeholder="Twitter Profile URL"
												name="twitter"
												value={this.state.twitter}
												onChange={this.onChange}
											/>
											{errors.twitter && (
												<div className="is-invalid invalid-feedback">
													{errors.twitter}
												</div>
											)}
										</div>

										<div className="input-group mb-3">
											<div className="input-group-prepend">
												<span className="input-group-text">
													<i className="fab fa-facebook"></i>
												</span>
											</div>
											<input
												type="text"
												className={classnames('form-control form-control-lg', {
													'is-invalid': errors.facebook,
												})}
												placeholder="Facebook Page URL"
												name="facebook"
												value={this.state.facebook}
												onChange={this.onChange}
											/>
											{errors.facebook && (
												<div className="is-invalid invalid-feedback">
													{errors.facebook}
												</div>
											)}
										</div>

										<div className="input-group mb-3">
											<div className="input-group-prepend">
												<span className="input-group-text">
													<i className="fab fa-linkedin"></i>
												</span>
											</div>
											<input
												type="text"
												className={classnames('form-control form-control-lg', {
													'is-invalid': errors.linkedin,
												})}
												placeholder="Linkedin Profile URL"
												name="linkedin"
												value={this.state.linkedin}
												onChange={this.onChange}
											/>
											{errors.linkedin && (
												<div className="is-invalid invalid-feedback">
													{errors.linkedin}
												</div>
											)}
										</div>

										<div className="input-group mb-3">
											<div className="input-group-prepend">
												<span className="input-group-text">
													<i className="fab fa-youtube"></i>
												</span>
											</div>
											<input
												type="text"
												className={classnames('form-control form-control-lg', {
													'is-invalid': errors.youtube,
												})}
												placeholder="YouTube Channel URL"
												name="youtube"
												value={this.state.youtube}
												onChange={this.onChange}
											/>
											{errors.youtube && (
												<div className="is-invalid invalid-feedback">
													{errors.youtube}
												</div>
											)}
										</div>

										<div className="input-group mb-3">
											<div className="input-group-prepend">
												<span className="input-group-text">
													<i className="fab fa-instagram"></i>
												</span>
											</div>
											<input
												type="text"
												className={classnames('form-control form-control-lg', {
													'is-invalid': errors.instagram,
												})}
												placeholder="Instagram Page URL"
												name="instagram"
												value={this.state.instagram}
												onChange={this.onChange}
											/>
											{errors.instagram && (
												<div className="is-invalid invalid-feedback">
													{errors.instagram}
												</div>
											)}
										</div>
									</div>
								)}
								<input type="submit" className="btn btn-info btn-block mt-4" />
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

CreatProfile.propType = {
	profile: PropTypes.object.isRequired,
	error: PropTypes.object.isRequired,
	createProfile: PropTypes.func.isRequired,
	getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	error: state.error,
});

const isEmpty = (errors) => {
	return (
		errors === undefined ||
		errors === null ||
		(typeof errors === 'object' && Object.keys(errors).length === 0) ||
		(typeof errors === 'string' && errors.trim().length === 0)
	);
};
export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
	CreatProfile
);
