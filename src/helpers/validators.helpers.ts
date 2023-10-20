import * as yup from 'yup';

export const pincodeValidator = /^[0-9]{6}$/;
export const pincodeSchema = yup.object().shape({
	pincode: yup.string()
	.required('pincode is required')
	.matches(pincodeValidator, 'pincode is not valid'),
});

export const phoneValidator = /^[6-9]\d{9}$/;
export const loginValidationSchema = yup.object().shape({
	mobileNumber: yup.string()
	.required('phone number is required')
	.matches(phoneValidator, 'Phone number is not valid'),
});

export const otpValidator = /^[0-9]{6}$/;
export const otpSchema = yup.object().shape({
	otp: yup.string()
	.required('otp is required')
	.matches(otpValidator, 'otp is not valid'),
});
