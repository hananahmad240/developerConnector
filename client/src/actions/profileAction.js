import {
    GET_ERRORS,
    GET_PROFILE,
    GET_PROFILES,
    CLEAR_CURRENT_PROFILE,
    PROFILE_LOADING,
    PROFILE_NOT_FOUND,
    SET_CURRENT_USER,
    USER_PROFILE,
} from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

// current profile of user who logged in
export const getCurrentProfile = () => (dispatch) => {
    if (localStorage.jwtToken) {
        // console.log(localStorage.jwtToken);
        setAuthToken(localStorage.jwtToken);
        dispatch(setProfileLoading());

        // get profile
        axios
            .get('/api/profile')
            .then((res) => {
                console.log(res.data);
                dispatch({
                    type: GET_PROFILE,
                    payload: res.data,
                });
            })
            .catch((err) => {
                console.log(err.response.data);
                dispatch({
                    type: GET_PROFILE,
                    payload: {},
                });
            });
    }
};

// set loading
export const setProfileLoading = () => (dispatch) => {
    dispatch({
        type: PROFILE_LOADING,
    });
};

// clear profile
export const clearCurrentProfile = () => (dispatch) => {
    dispatch({
        type: CLEAR_CURRENT_PROFILE,
    });
};

// creat profile

export const createProfile = (profileData, history) => (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    axios
        .post('/api/profile', profileData, config)
        .then((res) => {
            console.log(res.data);
            history.push('/dashboard');
        })
        .catch((err) => {
            console.log(err.response.data.errors);
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data.errors,
            });
        });
};


// delete profile

export const deleteProfile = () => (dispatch) => {
    if (window.confirm('Are you sure? This can not be undone!')) {
        axios.delete('/api/profile').then((res) => {
                console.log(res.data);
                dispatch({
                    type: SET_CURRENT_USER,
                    payload: {}
                })

            })
            .catch((err) => {
                console.log(err.response.data);


            })

    }
}


// add experience
export const addExperience = (experienceData, history) => (dispatch) => {
    if (localStorage.jwtToken) {
        setAuthToken(localStorage.jwtToken);
        dispatch(setProfileLoading());
        const config = {
            headers: {
                'Content-Type': "application/json"
            }
        };
        axios.post('/api/profile/experience', experienceData, config).then((res) => {
                console.log(res.data);

                dispatch({
                    type: GET_PROFILE,
                    payload: res.data
                });
                history.push('/dashboard');

            })
            .catch((err) => {
                console.log(err.response.data);
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data.errors
                })

            })
    } else {
        dispatch({
            type: GET_ERRORS,
            payload: {}
        })
    }

}


// add education
export const addEducation = (educationData, history) => (dispatch) => {
    if (localStorage.jwtToken) {
        setAuthToken(localStorage.jwtToken);
        dispatch(setProfileLoading());
        const config = {
            headers: {
                'Content-Type': "application/json"
            }
        };
        axios.post('/api/profile/education', educationData, config).then((res) => {
                console.log(res.data);

                dispatch({
                    type: GET_PROFILE,
                    payload: res.data
                });
                history.push('/dashboard');

            })
            .catch((err) => {
                console.log(err.response.data);
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data.errors
                })

            })
    } else {
        dispatch({
            type: GET_ERRORS,
            payload: {}
        })
    }

}


// delete experience
export const deleteExperience = (exp_id) => (dispatch) => {

    if (localStorage.jwtToken) {
        setAuthToken(localStorage.jwtToken);
        dispatch(setProfileLoading());

        axios.delete(`/api/profile/experience/${exp_id}`).then((res) => {
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        }).catch((err) => {
            console.log(err.response.data);
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })

    } else {
        dispatch({
            type: GET_ERRORS,
            payload: {}
        })
    }
}

// delete education
export const deleteEducation = (edu_id) => (dispatch) => {

    if (localStorage.jwtToken) {
        setAuthToken(localStorage.jwtToken);
        dispatch(setProfileLoading());

        axios.delete(`/api/profile/education/${edu_id}`).then((res) => {
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        }).catch((err) => {
            console.log(err.response.data);
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })

    } else {
        dispatch({
            type: GET_ERRORS,
            payload: {}
        })
    }
}

// get all profile
export const getAllProfile = () => (dispatch) => {
    dispatch(
        setProfileLoading()
    );

    axios.get('/api/profile/all').then((res) => {
        // console.log(res.data.data);

        dispatch({
            type: GET_PROFILES,
            payload: res.data.data
        })

    }).catch((err) => {
        dispatch({
            type: GET_ERRORS,
            payload: {}
        })
    });
}


// get single profile user who logged in 

export const getProfileofUser = (id) => (dispatch) => {
    dispatch(setProfileLoading());

    axios.get(`/api/profile/user/${id}`).then((res) => {
        // console.log(res.data.data);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    }).catch((err) => {
        dispatch({
            type: GET_ERRORS,
            payload: {}
        })

    });
}