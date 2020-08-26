const validator = require('validator');
const valiadateLogin = (data) => {
    let errors = {};
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if (!validator.isEmail(data.email)) {
        errors.email = 'email is envalid'
    }

    if (validator.isEmpty(data.email)) {
        errors.email = 'email fields is required';
    }
    if (validator.isEmpty(data.password)) {
        errors.password = 'password fields is required';
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

module.exports = valiadateLogin;