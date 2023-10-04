import axios from 'axios';
import { ApiEndpoints } from '../utils/api-endpoints.api';
import Config from 'react-native-config';
import { useMutation, useQuery } from 'react-query';

interface Props {
	state?: string;
	pincode?: number;
	clusterId?: number;
	customerLocation?: {
		lat?: any;
		lon?: any;
	};
	storeVisibility?: boolean;
	videoCall?: 1 | 0;
	pageNo?: number;
	pageSize?: number;
}
interface PropsI {
	state?: string;
	storeVisibility?: boolean;
	sortBy?: string;
	pageSize?: any;
}

export const fetchStoreList = (params: Props) => {
	return axios.get(`${Config.BASE_PATH}${ApiEndpoints.STORES}`, {
		params
	});
};

export const useGetStoresQuery = (params: PropsI) => {
	return useQuery([ApiEndpoints.STORES, params], async () => {
		const { data: response } = await fetchStoreList(params);
		return response;
	});
};

export const useGetStoresMutation = () => {
	return useMutation(fetchStoreList);
};
