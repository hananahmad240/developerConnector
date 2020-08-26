import {
    GET_POST,
    GET_POSTS,
    POST_LOADING,
    ADD_POST,
    DELETE_POST,
} from '../actions/types';



const initialsState = {
    posts: [],
    post: {},
    loading: false
}

export default function (state = initialsState, action) {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts],
                    loading: false
            }
            case GET_POSTS:
                return {
                    ...state,
                    posts: action.payload,
                        loading: false
                }
                case POST_LOADING:
                    return {
                        ...state,
                        loading: true
                    }
                    case DELETE_POST:
                        return {
                            ...state,
                            posts: state.posts.filter((post) => post._id !== action.payload)
                        }
                        case GET_POST:
                            return {
                                ...state,
                                post: action.payload,
                                    loading: false
                            }
                            default:
                                return state;
    }
}