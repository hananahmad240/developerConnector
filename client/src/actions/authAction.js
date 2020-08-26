import {
    GET_ERRORS,
    SET_CURRENT_USER
} from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

// register user
export const registerUser = (userData, history) => (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    axios
        .post('/api/users/register', userData, config)
        .then((res) => {
            // console.log(res.data);
            history.push('/login');
        })
        .catch((err) => {
            // console.log(err.response.data.errors);
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data.errors,
            });
        });
    // return {
    //     type: TEST_DISPATCH,
    //     payload: userData
    // }
};

// login user with token

export const loginUser = (userData) => (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    axios
        .post('/api/users/login', userData, config)
        .then((res) => {
            // console.log(res.data.data);
            // console.log(res.data.token);
            const {
                token
            } = res.data;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            const decode = jwt_decode(token);
            // it gives us id
            // console.log(decode);
            dispatch(setCurrentUser(decode));
        })
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data.errors,
            });
        });
};

// set current user
export const setCurrentUser = (decode) => (dispatch) => {

    if (localStorage.jwtToken) {
        setAuthToken(localStorage.jwtToken);
        axios.get('/api/users/current').then((res) => {
            // console.log(res.data);
            dispatch({
                type: SET_CURRENT_USER,
                payload: res.data,
            })

        }).catch((err) => {
            // console.log(err.response.data.err);
            dispatch({
                type: GET_ERRORS,
                payload: {},
            })

        });

    } else {
        dispatch({
            type: SET_CURRENT_USER,
            payload: {}, // id of user
        });
    }





}


// logout

export const logoutUser = () => (dispatch) => {
    // remove token from localstortage
    localStorage.removeItem('jwtToken');
    // remove token from headers
    setAuthToken(false);

    // set current user from {}
    dispatch(setCurrentUser({}));

}