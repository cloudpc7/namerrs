import * as Yup from 'yup';

export const cardFormValidation = Yup.object().shape({
  businessName: Yup.string().required('Business name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().matches(/^\d{10}$/, 'Phone number must be 10 digits').optional(),
  address: Yup.string().required('Address is required'),
});