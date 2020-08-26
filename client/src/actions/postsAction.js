import {
    GET_POST,
    GET_POSTS,
    POST_LOADING,
    ADD_POST,
    DELETE_POST,
    GET_ERRORS
} from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';


// add post
export const addPost = (postData) => (dispatch) => {
    if (localStorage.jwtToken) {
        setAuthToken(localStorage.jwtToken);
        const config = {
            headers: {
                'Content-Type': "application/json"
            }
        }
        dispatch(setPostLoading);

        axios.post('/api/posts', postData, config).then((res) => {

            dispatch({
                type: ADD_POST,
                payload: res.data.data
            })
        }).catch((err) => {
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


//  get all posts
export const getAllPosts = () => (dispatch) => {
    dispatch(setPostLoading);
    axios.get('/api/posts').then((res) => {
        dispatch({
            type: GET_POSTS,
            payload: res.data.data
        })
    }).catch((err) => {
        dispatch({
            type: GET_ERRORS,
            payload: {}
        })
    })
}
// set loading
export const setPostLoading = () => (dispatch) => {
    dispatch({
        type: POST_LOADING
    })
}
// delte posts bu id
export const deletePost = (id) => (dispatch) => {
    if (localStorage.jwtToken) {
        setAuthToken(localStorage.jwtToken);
        axios.delete(`api/posts/${id}`).then((res) => {
            dispatch({
                type: DELETE_POST,
                payload: id
            })
        }).catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data.error
            })
        })
    }
}

// add like
export const addLike = (id) => (dispatch) => {
    if (localStorage.jwtToken) {
        setAuthToken(localStorage.jwtToken);
        axios.post(`/api/posts/like/${id}`).then((res) => {
            // console.log(res.data);
            dispatch(
                getAllPosts()
            )
        }).catch((err) => {
            console.log(err.response.data);
        })
    }
}

// delete like
export const disLike = (id) => (dispatch) => {
    if (localStorage.jwtToken) {
        setAuthToken(localStorage.jwtToken);
        axios.post(`/api/posts/dislike/${id}`).then((res) => {
            // console.log(res.data);
            dispatch(
                getAllPosts()
            )
        }).catch((err) => {
            console.log(err.response.data);
        })
    }
}

// get single post
export const getSinglePost = (id) => (dispatch) => {

    axios.get(`/api/posts/${id}`).then((res) => {
        console.log(res.data);
        dispatch({
            type: GET_POST,
            payload: res.data
        })
    }).catch((err) => {
        console.log(err.response.data);
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    })

}

export const addComment = (postid, commentData) => (dispatch) => {
    if (localStorage.jwtToken) {
        console.log(commentData);
        setAuthToken(localStorage.jwtToken);
        const config = {
            headers: {
                'Content-Type': "application/json"
            }
        }
        dispatch(setPostLoading);
        axios.post(`/api/posts/comment/${postid}`, commentData, config).then((res) => {
            console.log(res.data);
            dispatch({
                type: GET_POST,
                payload: res.data
            })

        }).catch((err) => {
            // console.log(err.response.data.errors);
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data.errors
            })
        })
    } else {

    }
}