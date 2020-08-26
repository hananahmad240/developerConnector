import {
    GET_ERRORS,
    GET_PROFILE,
    GET_PROFILES,
    CLEAR_CURRENT_PROFILE,
    PROFILE_LOADING,
    PROFILE_NOT_FOUND,
    USER_PROFILE
} from '../actions/types';

const initialState = {
    profile: null,
    profiles: null,
    loading: false,
    userprofile: null
}

export default function (state = initialState, action) {
    switch (action.type) {

        case PROFILE_LOADING:
            return {
                ...state,
                loading: true
            }
            case GET_PROFILE:
                return {
                    ...state,
                    profile: action.payload,
                        loading: false
                }
                case CLEAR_CURRENT_PROFILE:
                    return {
                        ...state,
                        profile: null
                    }
                    case GET_PROFILES:
                        return {
                            ...state,
                            profiles: action.payload,
                                loading: false
                        }
                        case USER_PROFILE:
                            return {
                                ...state,
                                userprofile: action.payload
                            }

                            default:
                                return state
    }
}