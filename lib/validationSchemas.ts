import * as Yup from 'yup';
import {
  validateCardNumber,
  validateExpiry,
  validateCVV,
} from '@/utils/paymentUtils';

//
export const registerSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  phoneNumber: Yup.string()
    .matches(/^\+?[1-9]\d{1,14}$/, {
      message: 'Invalid phone number format (e.g., +1234567890)',
      excludeEmptyString: true,
    })
    .nullable()
    .required('Phone Numberd is required'),
});

//
export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
  rememberMe: Yup.boolean().default(false),
});

//
export const addressSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  address: Yup.string()
    .min(5, 'Address must be at least 5 characters')
    .required('Address is required'),
  city: Yup.string()
    .min(2, 'City must be at least 2 characters')
    .required('City is required'),
  zipCode: Yup.string()
    .matches(
      /^\d{5}(-\d{4})?$/,
      'Invalid zip code format (e.g., 12345 or 12345-6789)',
    )
    .required('Zip code is required'),
  country: Yup.string()
    .min(2, 'Country must be at least 2 characters')
    .required('Country is required'),
  phone: Yup.string()
    .matches(
      /^\+?[1-9]\d{1,14}$/,
      'Invalid phone number format (e.g., +1234567890)',
    )
    .required('Phone number is required'),
  isDefault: Yup.boolean().default(false),
});

//
export const paymentSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  cardNumber: Yup.string()
    .required('Card number is required')
    .test('valid-card', 'Invalid card number', (value) => {
      if (!value) return false;
      const digits = value.replace(/\s/g, '');
      return validateCardNumber(digits);
    }),
  expiry: Yup.string()
    .required('Expiry date is required')
    .test('valid-expiry', 'Invalid or expired expiry date', (value) => {
      if (!value) return false;
      return validateExpiry(value);
    }),
  cvv: Yup.string()
    .required('CVV is required')
    .test('valid-cvv', 'Invalid CVV', function (value) {
      if (!value) return false;
      const cardNumber = this.parent.cardNumber?.replace(/\s/g, '') || '';
      return validateCVV(value, cardNumber);
    }),
  isDefault: Yup.boolean().default(false),
});
