import { useQuery, useInfiniteQuery } from 'react-query';
import { PER_PAGE } from 'helpers/products';
import { ApiEndpoints } from 'api/utils/api-endpoints.api';
import { httpTokenGet } from '../utils/utils';
import Config from 'react-native-config';

export const fetchOrders = async ({ queryKey }) => {
	const [_key, _params] = queryKey;
	let data = await httpTokenGet(
		`${Config.BASE_PATH}${ApiEndpoints.ORDERS}?pageSize=${PER_RootPAGE}&pageNo=${_params.page}`
	);
	return data;
};

export const useOrdersQuery = (page: string) => {
	return useQuery<any, Error>([ApiEndpoints.ORDERS, { page }], fetchOrders, {
		refetchOnMount: 'always'
	});
};
