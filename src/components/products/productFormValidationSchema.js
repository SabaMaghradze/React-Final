import * as yup from 'yup';

export const productFormValidationSchema = yup.object({
    name: yup
        .string()
        .required('Must provide product name')
        .min(3, 'Name should contain at least 3 characters'),
    description: yup
        .string()
        .required('Must provide description')
        .min(3, 'Description should contain at least 3 characters'),
    brand: yup
        .string()
        .required('Must provide brand name')
        .min(3, 'Must contain at least 3 characters'),
    category: yup
        .string()
        .required('Must provide category')
        .min(3, 'Must contain at least 3 characters'),
    price: yup.number().min(1, 'Must contain at least 1 digit').required()
});