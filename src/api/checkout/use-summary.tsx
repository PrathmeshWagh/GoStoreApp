import { useMutation, useQuery } from 'react-query';
import Config from 'react-native-config';
import { ApiEndpoints } from '../utils/api-endpoints.api';
import { httpTokenGet } from '../utils/utils';
import { useCheckout } from 'context/checkout/checkout.context';
import { useCheckoutContext } from 'context/ui.checkout.cart';

async function getCheckoutSummary(params) {
	const queryString = new URLSearchParams(params).toString();
	const withCredsHttpConfig = {
		withCredentials: true
	};
	const response = await httpTokenGet(
		`${Config.BASE_PATH}${ApiEndpoints.ORDER_SUMMARY}?${queryString}`,
		withCredsHttpConfig
	);
	return response;
}

export const useCheckoutSummaryMutation = () => {
	const { setCheckoutData } = useCheckout();
	const { setCheckoutDetails } = useCheckoutContext();
	return useMutation(getCheckoutSummary, {
		onSuccess: async (data) => {
			setCheckoutData(data);
			setCheckoutDetails(data);
		},
		onError: (data) => {
			setCheckoutData(data);
		}
	});
};
