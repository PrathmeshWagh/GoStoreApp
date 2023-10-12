import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import Config from 'react-native-config';
import { ApiEndpoints } from '../utils/api-endpoints.api';

export async function getPincode(pincode: any) {
	console.log('pincode', pincode);

	let response = await axios.get(
		`${Config.BASE_PATH_INVENTORY}${ApiEndpoints.USER_PINCODE}/${pincode}`
	);
	return response;
}

export const useGetPincodeMutation = () => {
	return useMutation((data: any) => getPincode(data), {
		onSuccess: (data: any) => {
			return data;
		},
		onError: (error) => console.log(' error')
	});
};
