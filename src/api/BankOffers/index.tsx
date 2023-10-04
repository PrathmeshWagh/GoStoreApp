import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import { ApiEndpoints } from '../utils/api-endpoints.api';
import Config from 'react-native-config';

export const fetchBrandList = (retailerId: any, totalAmount: any) => {
	return axios.get(`${Config.NEXT_PUBLIC_GOPAY_API}${ApiEndpoints.BANK_OFFERS}`, {
		params: {
			retailer_id: retailerId,
			total_amount: totalAmount
		}
	});
};

export const useBankOffers = (retailerId: any, totalAmount: any) => {
	return useQuery([ApiEndpoints.BANK_OFFERS], async () => {
		const { data: response } = await fetchBrandList(retailerId, totalAmount);
		return response;
	});
};

// interface paramsProps {
// 	retailer_id: any;
// 	total_amount: any;
// }

// export const fetchBrandList = async (params: paramsProps) => {
// 	const { data } = await axios.get(`${Config.BASE_PATH}${ApiEndpoints.PRODUCT}?${params}`);

// 	return data;
// };

// export const useBankOffersMutation = () => {
// 	return useMutation(fetchBrandList);
// };
