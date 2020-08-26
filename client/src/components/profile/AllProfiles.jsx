import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllProfile } from '../../actions/profileAction';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

class AllProfiles extends Component {
	constructor() {
		super();
	}

	componentDidMount() {
		this.props.getAllProfile();
	}
	render() {
		const { profiles, loading } = this.props.profile;
		let profilesItem;

		if (profiles === null || loading) {
			profilesItem = <Spinner></Spinner>;
		} else {
			if (profiles.length > 0) {
				profilesItem = profiles.map((profile) => (
					<div className="card card-body bg-light mb-3" key={profile._id}>
						<div className="row">
							<div className="col-2">
								<img
									className="rounded-circle"
									src={profile.user.avatar}
									alt=""
								/>
							</div>
							<div className="col-lg-6 col-md-4 col-8">
								<h3>{profile.user.name} </h3>
								<p>{profile.status}</p>
								<p>{profile.location}</p>
								<Link
									to={`/profile/${profile.user._id}`}
									className="btn btn-info"
								>
									View Profile
								</Link>
							</div>
							<div className="col-md-4 d-none d-lg-block">
								<h4>Skill Set</h4>
								<ul className="list-group">
									{profile.skills.map((skill) => (
										<li className="list-group-item" key={uuid()}>
											<i className="fa fa-check pr-1"></i>
											{skill}
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				));
			} else {
				profilesItem = <h1>Profiles no here</h1>;
			}
		}
		return (
			<div className="profiles">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<h1 className="display-4 text-center">Developer Profiles</h1>
							<p className="lead text-center">
								Browse and connect with developers
							</p>

							{profilesItem}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

AllProfiles.propTypes = {
	getAllProfile: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
	profile: state.profile,
});

export default connect(mapStateToProps, { getAllProfile })(AllProfiles);
