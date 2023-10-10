import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import Config from 'react-native-config';
import { ApiEndpoints } from '@api/utils/api-endpoints.api';

interface paramsProps {
	productId: any;
	supplierId?: any;
	clusterId?: any;
}

export const fetchProductMutation = async (params: paramsProps) => {
	const queryString = new URLSearchParams({ ...params }).toString();

	const { data } = await axios.get(`${Config.BASE_PATH}${ApiEndpoints.PRODUCT}?${queryString}`);

	return data;
};

export const useProductMutation = () => {
	return useMutation(fetchProductMutation);
};
