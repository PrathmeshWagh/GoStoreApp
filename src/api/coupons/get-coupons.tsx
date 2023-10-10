import { useQuery } from 'react-query';

import { ApiEndpoints } from 'api/utils/api-endpoints.api';
import Config from 'react-native-config';
// import { httpTokenGet } from '../utils/utils';

export const fetchCoupons = async () => {
	const withCredsHttpConfig = {
		withCredentials: true
	};
	// let data = await httpTokenGet(
	// 	`${process.env.NEXT_PUBLIC_MAIN}${ApiEndpoints.COUPONS}`,
	// 	withCredsHttpConfig
	// );
	// return data;
};

export const useCouponsQuery = () => {
	return useQuery<any, Error>([ApiEndpoints.COUPONS], fetchCoupons);
};
