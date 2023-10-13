import { useMutation, useQuery } from 'react-query';
import Config from 'react-native-config';
import { ApiEndpoints } from '../utils/api-endpoints.api';
import { httpTokenGet } from '../utils/utils';

export const fetchAddress = async () => {
	let data = await httpTokenGet(`${Config.BASE_PATH}${ApiEndpoints.ADDRESS}`);
	return data.data;
};

export const useAddressQuery = () => {
	return useQuery<Array<object>, Error>([ApiEndpoints.ADDRESS], () => fetchAddress());
};

export const useAddressMutation = () => {
	return useMutation(fetchAddress, {
		onSuccess: (response) => {
			return response;
		},
		onError: (error) => {
			console.log('get all addresses error', error);
		}
	});
};
