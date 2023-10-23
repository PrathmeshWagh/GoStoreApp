import { useQuery, useInfiniteQuery } from 'react-query';
import { PER_PAGE } from 'helpers/products';
import { ApiEndpoints } from 'api/utils/api-endpoints.api';
import { httpTokenGet } from '../utils/utils';

export const fetchOrders = async () => {
	let params = 1;
	let data = await httpTokenGet(
		`${process.env.NEXT_PUBLIC_MAIN}${ApiEndpoints.ORDERS}?pageSize=${PER_PAGE}&pageNo=${params}`
	);
	return data;
};

export const fetchInfiniteOrders = async ({ pageParam = 1 }) => {
	let data = await httpTokenGet(
		`${process.env.NEXT_PUBLIC_MAIN}${ApiEndpoints.ORDERS}?pageSize=${PER_PAGE}&pageNo=${pageParam}`
	);
	return data;
};

export const useInfiniteOrdersQuery = () => {
	return useInfiniteQuery<any, Error>([ApiEndpoints.ORDERS], fetchInfiniteOrders, {
		getNextPageParam: (data) => {
			const { currentPage = 1, totalOrders } = data?.data;
			const lastPage = Math.ceil(totalOrders / PER_PAGE);
			return currentPage === lastPage ? undefined : currentPage + 1;
		}
	});
};

export const useOrdersQuery = (page: string) => {
	return useQuery<any, Error>([ApiEndpoints.ORDERS, { page }], fetchOrders, {
		refetchOnMount: 'always'
	});
};
