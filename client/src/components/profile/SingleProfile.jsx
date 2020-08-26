import React, { Component } from 'react';
import { getProfileofUser } from '../../actions/profileAction';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { v3 as uuid3 } from 'uuid';
import Moment from 'react-moment';

class SingleProfile extends Component {
	constructor() {
		super();
		this.state = {
			userProfile: null,
		};
	}

	componentDidMount() {
		if (this.props.match.params.id) {
			this.props.getProfileofUser(this.props.match.params.id);
		}
		// console.log(this.props.profile.data);
	}
	isEmpty = (errors) => {
		return (
			errors === undefined ||
			errors === null ||
			(typeof errors === 'object' && Object.keys(errors).length === 0) ||
			(typeof errors === 'string' && errors.trim().length === 0)
		);
	};

	render() {
		const { profile, loading } = this.props.profile;
		let content;
		if (profile === null || loading) {
			content = <Spinner></Spinner>;
		} else {
			content = (
				<div className="col-md-12">
					<div className="row">
						<div className="col-6">
							<Link to="/profiles" className="btn btn-light mb-3 float-left">
								Back To Profiles
							</Link>
						</div>
						<div className="col-6"></div>
					</div>

					<div className="row">
						<div className="col-md-12">
							<div className="card card-body bg-info text-white mb-3">
								<div className="row">
									<div className="col-4 col-md-3 m-auto">
										<img
											className="rounded-circle"
											src={profile.data.user.avatar}
											alt=""
										/>
									</div>
								</div>
								<div className="text-center">
									<h1 className="display-4 text-center">
										{profile.data.user.name}
									</h1>
									<p className="lead text-center">{profile.data.status}</p>
									<p>{profile.data.location}</p>
									<p>
										{profile.data.social && profile.data.social.twitter ? (
											<a className="text-white p-2" href="#">
												<i className="fab fa-twitter fa-2x"></i>
											</a>
										) : null}

										{profile.data.social && profile.data.social.facebook ? (
											<a className="text-white p-2" href="#">
												<i className="fab fa-facebook fa-2x"></i>
											</a>
										) : null}

										{profile.data.social && profile.data.social.instagram ? (
											<a className="text-white p-2" href="#">
												<i className="fab fa-instagram fa-2x"></i>
											</a>
										) : null}

										{profile.data.social && profile.data.social.youtube ? (
											<a className="text-white p-2" href="#">
												<i className="fab fa-youtube fa-2x"></i>
											</a>
										) : null}

										{profile.data.social && profile.data.social.linkedin ? (
											<a className="text-white p-2" href="#">
												<i className="fab fa-linkedin fa-2x"></i>
											</a>
										) : null}
									</p>
								</div>
							</div>
						</div>
					</div>

					<div className="row">
						<div className="col-md-12">
							<div className="card card-body bg-light mb-3">
								<h3 className="text-center text-info">
									{profile.data.user.name} Bio
								</h3>

								{profile.data.bio && (
									<div className="lead">{profile.data.bio}</div>
								)}

								<hr />
								<h3 className="text-center text-info">Skill Set</h3>
								<div className="row">
									<div className="d-flex flex-wrap justify-content-center align-items-center text-center">
										{profile.data.skills.map((skill) => (
											<div className="p-3" key={uuid()}>
												<i className="fa fa-check"></i>
												{skill}
											</div>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="row">
						<div className="col-md-6">
							<h3 className="text-center text-info">Experience</h3>
							<ul className="list-group">
								{profile.data.experience &&
									profile.data.experience.map((exp) => (
										<li className="list-group-item" key={exp._id}>
											<h4>{exp.company}</h4>
											<p>
												<Moment data={exp.from} format="YYYY/MM/DD"></Moment>
											</p>
											<p>
												<strong>Position:</strong>
												{exp.title}
											</p>
											<p>
												<strong>Location:</strong>
												{exp.location && exp.location}
											</p>
											<p>
												<strong>Description:</strong>
												{exp.description && exp.description}
											</p>
										</li>
									))}
							</ul>
						</div>

						<div className="col-md-6">
							<h3 className="text-center text-info">Education</h3>
							<ul className="list-group">
								{profile.data.education &&
									profile.data.education.map((edu) => (
										<li className="list-group-item" key={edu._id}>
											<h4>{edu.school}</h4>
											<p>
												<Moment data={edu.from} format="YYYY/MM/DD"></Moment>
												{edu.to && (
													<Moment data={edu.from} format="YYYY/MM/DD"></Moment>
												)}
											</p>
											<p>
												<strong>Degree :</strong>
												{edu.degree && edu.degree}
											</p>
											<p>
												<strong>:Field Of Study :</strong>
												{edu.fieldofstudy && edu.fieldofstudy}
											</p>
											<p>
												<strong>Description:</strong>
												{edu.description && edu.description}
											</p>
										</li>
									))}
							</ul>
						</div>
					</div>
				</div>
			);
		}
		return (
			<div className="profile">
				<div className="container">
					<div className="row">{content}</div>
				</div>
			</div>
		);
	}
}

SingleProfile.propTypes = {
	profile: PropTypes.object.isRequired,
	getProfileofUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
});

export default connect(mapStateToProps, { getProfileofUser })(SingleProfile);
