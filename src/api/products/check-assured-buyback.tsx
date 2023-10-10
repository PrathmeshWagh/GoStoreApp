import axios from 'axios';
import { useQuery } from 'react-query';

import { ApiEndpoints } from '../utils/api-endpoints.api';
import Config from 'react-native-config';

export const checkAssuredBuyBack = async ({ queryKey }: any) => {
	const [_key, _params] = queryKey;

	if (_params?.productId) {
		return await axios.get(
			`${process.env.NEXT_PUBLIC_MAIN}${ApiEndpoints.ASSURED_BUYBACK_PLAN_DETAILS}?productId=${_params.productId}&clusterId=${_params.clusterId}`
		);
	}
};

export const useCheckAssuredBuyBack = (options: any) => {
	return useQuery<any, Error>(
		[ApiEndpoints.ASSURED_BUYBACK_PLAN_DETAILS, options],
		checkAssuredBuyBack
	);
};
