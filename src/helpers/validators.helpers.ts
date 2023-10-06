import * as yup from 'yup';

export const pincodeValidator = /^[0-9]{6}$/;
export const pincodeSchema = yup.object().shape({
	pincode: yup.string()
	.required('pincode is required')
	.matches(pincodeValidator, 'pincode is not valid'),
});
