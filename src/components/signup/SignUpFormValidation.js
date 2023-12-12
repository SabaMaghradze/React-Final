import * as yup from 'yup'; // facilitates validating forms

export const SignupValidationSchema = yup.object({
    firstName: yup
        .string()
        .required('Must provide the first name')
        .min(3, 'The first name must contain at least 3 characters')
        .max(20, 'The first name must not exceed 20 characters'),
    lastName: yup
        .string()
        .required('Must provide the last name')
        .min(3, 'The last name must contain at least 3 characters')
        .max(20, 'The last name must not exceed 20 characters'),
    email: yup.string().required('Must provide email address').email('Invalid email address'),
    password: yup
        .string()
        .required('Must provide the password')
        .min(6, 'The password must contain at least 6 characters')
        .max(20, 'The password must not exceed 20 characters'),
});
