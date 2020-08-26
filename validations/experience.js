const validator = require('validator');
const validateExperience = (data) => {
    let errors = {};
    data.title = !isEmpty(data.title) ? data.title : '';
    data.company = !isEmpty(data.company) ? data.company : '';
    data.from = !isEmpty(data.from) ? data.from : '';


    if (validator.isEmpty(data.title)) {
        errors.title = 'title fields is required';
    }
    if (validator.isEmpty(data.company)) {
        errors.company = 'company fields is required';
    }
    if (validator.isEmpty(data.from)) {
        errors.from = 'from fields is required';
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

module.exports = validateExperience;