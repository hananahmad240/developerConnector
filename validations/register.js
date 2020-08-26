const {
    default: validator
} = require('validator');
const valiadateRegister = (data) => {
    let errors = {};
    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

    if (!validator.isLength(data.name, {
            min: 5,
            max: 30
        })) {
        errors.name = 'name must be between 5 to 30 characters';
    }

    if (!validator.isLength(data.password, {
            min: 6,
            max: 30
        })) {
        errors.password = 'password must be between 6 to 30 characters';
    }

    if (!validator.isEmail(data.email)) {
        errors.email = 'email is envalid'
    }

    if (validator.isEmpty(data.name)) {
        errors.name = 'name fields is required';
    }
    if (validator.isEmpty(data.email)) {
        errors.email = 'email fields is required';
    }
    if (validator.isEmpty(data.password)) {
        errors.password = 'password fields is required';
    }
    if (validator.isEmpty(data.password2)) {
        errors.password2 = 'confirm password fields is required';
    }








    if (!validator.isEmpty(data.password2)) {
        if (!validator.equals(data.password, data.password2)) {
            errors.password2 = 'password must match'
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

module.exports = valiadateRegister;