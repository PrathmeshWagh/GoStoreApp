import { ApiEndpoints } from '../utils/api-endpoints.api';
import Config from 'react-native-config';
import Toast from 'react-native-toast-message';
import { useMutation, useQuery } from 'react-query';
import { httpTokenGet } from '../utils/utils';
import { useCart } from 'context/ui.cart';

async function getCartCount() {
	const withCredsHttpConfig = {
		withCredentials: true
	};
	const response = httpTokenGet<ApiResponses.GetCartCountResponse>(
		`${Config.BASE_PATH_INVENTORY}${ApiEndpoints.CART_COUNT}`,
		withCredsHttpConfig
	);
	return response;
}

export const useCartCount = () => {
	const { setCartCount } = useCart();
	return useMutation(getCartCount, {
		onSuccess: async (response) => {
			if (response?.status === 'success') {
				setCartCount(response?.data?.count);
			} else {
				setCartCount(0);
			}
		},
		onError: (error) => {
			console.error('Error while getting Cart Count:', error);
			setCartCount(0);
		}
	});
};
