import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { getCurrentProfile, deleteProfile } from '../../actions/profileAction';
import setAuthToken from '../../utils/setAuthToken';
import Spinner from '../layout/Spinner';
import ProfileAction from './ProfileAction';

import Education from './Education';
import Experience from './Experience';

class Dashboard extends Component {
	constructor() {
		super();
		this.onDelete = this.onDelete.bind(this);
	}

	componentDidMount() {
		this.props.getCurrentProfile();
	}

	onDelete(e) {
		this.props.deleteProfile();
	}

	render() {
		const { user } = this.props.auth;
		const { profile, loading } = this.props.profile;
		let dashboardContent;
		if (profile === null || loading) {
			dashboardContent = <Spinner></Spinner>;
		} else {
			if (Object.keys(profile).length > 0) {
				// user has profile
				dashboardContent = (
					<div>
						<p className="lead text-muted">
							Welcome
							<Link to={`/profile/${profile.data.handle}`} className="ml-3">
								{user.name}
							</Link>
						</p>
						<ProfileAction></ProfileAction>
						{/* experience and education */}
						<Experience experience={profile.data.experience}></Experience>
						<Education education={profile.data.education}></Education>

						<div style={{ marginBottom: '60px' }}>
							<button className="btn btn-danger" onClick={this.onDelete}>
								Delete My Account
							</button>
						</div>
					</div>
				);
			} else {
				// user has no profile
				dashboardContent = (
					<div>
						<p className="lead text-muted">Welcome {user.name} </p>
						<p>You have not setup a profile please ass some info</p>
						<Link to="/create-profile" className="btn btn-lg btn-info">
							Creat Profile
						</Link>
					</div>
				);
			}
		}
		return (
			<div className="dashboard">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<h1 className="display-4">Dashboard</h1>
							{dashboardContent}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Dashboard.propTypes = {
	profile: PropTypes.object.isRequired,
	getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	deleteProfile: PropTypes.func.isRequired,
};

const mapStatetoProps = (state) => ({
	profile: state.profile,
	auth: state.auth,
});

export default connect(mapStatetoProps, { getCurrentProfile, deleteProfile })(
	Dashboard
);
