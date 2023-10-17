import { useMutation, useQuery } from 'react-query';
import Config from 'react-native-config';
import { ApiEndpoints } from '../utils/api-endpoints.api';
import { httpTokenGet } from '../utils/utils';
import { useCheckout } from 'context/checkout/checkout.context';
import { useCheckoutContext } from 'context/ui.checkout.cart';
import { useDispatch, useSelector } from 'react-redux';
import { checkOutData, checkOutDetails } from 'slices/checkOut.slice';

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
	const dispatch = useDispatch();

	return useMutation(getCheckoutSummary, {
		onSuccess: async (data) => {
			dispatch(checkOutData({ checkoutData: data }));
			dispatch(checkOutDetails({ checkOutDetails: data }));
		},
		onError: (data) => {
			dispatch(checkOutData({ checkoutData: data }));
		}
	});
};
