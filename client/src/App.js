import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import reduxStore from './reduxStore';
import jwtDecode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authAction';
import { clearCurrentProfile } from './actions/profileAction';

// components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/layout/PrivateRoute';
import CreateProfile from './components/profile/CreateProfile';
import EditProfile from './components/profile/EditProfile';
import AddEducation from './components/profile/AddEducation';
import AddExperience from './components/profile/AddExperience';
import AllProfiles from './components/profile/AllProfiles';
import SingleProfile from './components/profile/SingleProfile';
import Post from './components/posts/Post';
import SinglePost from './components/posts/SinglePost';

import store from './reduxStore';

// if we login than after refresh we store
if (localStorage.jwtToken) {
	setAuthToken(localStorage);
	const decode = jwtDecode(localStorage.jwtToken);
	// reduxStore.dispatch(setCurrentUser(decode));
	store.dispatch(setCurrentUser(decode));

	// check token expirei date
	const currentTime = Date.now() / 1000; // milisecond
	if (decode.exp < currentTime) {
		store.dispatch(logoutUser());
		store.dispatch(clearCurrentProfile());
		// redirect to login
		window.location.href = '/login';
	}
}

function App() {
	return (
		<Provider store={reduxStore}>
			<Fragment>
				<Router>
					<Navbar> </Navbar>
					<Switch>
						<Route exact path="/" component={Landing}></Route>
						<Route exact path="/register" component={Register}></Route>
						<Route exact path="/login" component={Login}></Route>
						<Route exact path="/profiles" component={AllProfiles}></Route>
						<Route exact path="/post/:id" component={SinglePost}></Route>
						<PrivateRoute
							exact
							path="/dashboard"
							component={Dashboard}
						></PrivateRoute>
						<PrivateRoute
							exact
							path="/create-profile"
							component={CreateProfile}
						></PrivateRoute>
						<PrivateRoute
							exact
							path="/profile"
							component={EditProfile}
						></PrivateRoute>
						<PrivateRoute
							exact
							path="/add-experience"
							component={AddExperience}
						></PrivateRoute>
						<PrivateRoute
							exact
							path="/add-education"
							component={AddEducation}
						></PrivateRoute>

						<PrivateRoute
							exact
							path="/profile/:id"
							component={SingleProfile}
						></PrivateRoute>

						<PrivateRoute exact path="/feed" component={Post}></PrivateRoute>
					</Switch>
				</Router>
				<Footer> </Footer>
			</Fragment>
		</Provider>
	);
}

export default App;
