import {
    SET_CURRENT_USER
} from '../actions/types';

const initialState = {
    isAuthenticate: false,
    user: {}
};


export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticate: !isEmpty(action.payload),
                    user: action.payload
            }

            default:
                return state
    }
}


const isEmpty = (errors) => {
    return (
        errors === undefined || errors === null || (typeof errors === 'object' && Object.keys(errors).length === 0) ||
        (typeof errors === 'string' && errors.trim().length === 0)
    )
}