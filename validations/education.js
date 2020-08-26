const validator = require('validator');
const validateEducation = (data) => {
    let errors = {};
    data.school = !isEmpty(data.school) ? data.school : '';
    data.degree = !isEmpty(data.degree) ? data.degree : '';
    data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';
    data.from = !isEmpty(data.from) ? data.from : '';


    if (validator.isEmpty(data.school)) {
        errors.school = 'school fields is required';
    }
    if (validator.isEmpty(data.degree)) {
        errors.degree = 'degree fields is required';
    }
    if (validator.isEmpty(data.fieldofstudy)) {
        errors.fieldofstudy = 'fieldofstudy fields is required';
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

module.exports = validateEducation;