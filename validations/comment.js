const {
    default: validator
} = require('validator');


const commentValidator = (data) => {
    const errors = {};
    data.text = !isEmpty(data.text) ? data.text : '';


    if (!validator.isLength(data.text, {
            min: 10,
            max: 300
        })) {
        errors.text = 'comment must be between 10 to 300 characters';
    }

    if (validator.isEmpty(data.text)) {
        errors.text = 'comment filed is required';
    }



    return {
        errors,
        isValid: isEmpty(errors)
    }

}

const isEmpty = (errors) => {
    return (
        errors === undefined || errors === null || (typeof errors === 'object' && Object.keys(errors).length === 0) ||
        (typeof errors === 'string' && errors.trim().length === 0)
    )
}

module.exports = commentValidator;