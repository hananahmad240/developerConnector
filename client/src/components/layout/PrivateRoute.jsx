import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

// in redux we put props here
const PrivateRoute = ({ component: Component, auth, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				auth.isAuthenticate === true ? (
					<Component {...props}></Component>
				) : (
					<Redirect to="/login"></Redirect>
				)
			}
		></Route>
	);
};

PrivateRoute.propTypes = {
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, {})(PrivateRoute);
