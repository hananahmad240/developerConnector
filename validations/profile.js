const validator = require('validator');
const valiadateProfile = (data) => {
    let errors = {};
    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.status = !isEmpty(data.status) ? data.status : '';
    data.skills = !isEmpty(data.skills) ? data.skills : '';

    if (!validator.isLength(data.handle, {
            min: 6,
            max: 40
        })) {
        errors.handle = 'handle must be 6 to 40 characters';
    }
    if (validator.isEmpty(data.handle)) {
        errors.handle = 'handle must be required';
    }
    if (validator.isEmpty(data.status)) {
        errors.status = 'status must be required';
    }
    if (validator.isEmpty(data.skills)) {
        errors.skills = 'skills must be required';
    }
    if (!isEmpty(data.website)) {
        if (!validator.isURL(data.website)) {
            errors.website = 'Not a valid URL'
        }
    }
    if (!isEmpty(data.youtube)) {
        if (!validator.isURL(data.youtube)) {
            errors.youtube = 'Not a valid URL'
        }
    }
    if (!isEmpty(data.twitter)) {
        if (!validator.isURL(data.twitter)) {
            errors.twitter = 'Not a valid URL'
        }
    }
    if (!isEmpty(data.instagram)) {
        if (!validator.isURL(data.instagram)) {
            errors.instagram = 'Not a valid URL'
        }
    }
    if (!isEmpty(data.linkedin)) {
        if (!validator.isURL(data.linkedin)) {
            errors.linkedin = 'Not a valid URL'
        }
    }
    if (!isEmpty(data.facebook)) {
        if (!validator.isURL(data.facebook)) {
            errors.facebook = 'Not a valid URL'
        }
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

module.exports = valiadateProfile;