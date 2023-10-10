import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import { ApiEndpoints } from '../utils/api-endpoints.api';
import Config from 'react-native-config';

export const fetchBrandList = (retailerId: number, totalAmount: number) => {
	console.log('om');

	console.log(`${Config.NEXT_PUBLIC_GOPAY_API}${ApiEndpoints.BANK_OFFERS}`);

	return axios.get(`${Config.NEXT_PUBLIC_GOPAY_API}${ApiEndpoints.BANK_OFFERS}`, {
		params: {
			retailer_id: retailerId,
			total_amount: totalAmount
		}
	});
};

export const useBankOffers = (retailerId: number, totalAmount: number) => {
	console.log('in');

	return useQuery([ApiEndpoints.BANK_OFFERS], async () => {
		const { data: response } = await fetchBrandList(retailerId, totalAmount);

		return response;
	});
};
