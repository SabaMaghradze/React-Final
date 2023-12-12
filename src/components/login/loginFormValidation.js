import React from 'react'
import * as yup from 'yup';

export const loginFormValidation = yup.object({
    email: yup.string().email('Invalid email address').required('Must provide email address'),
    password: yup
    .string()
    .required('Please provide your password')
    .min(6, 'The password length must exceed 5 characters')
    .max(20, 'The password length must not exceed 20 characters')
});

