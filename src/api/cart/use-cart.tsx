import { ApiEndpoints } from '../utils/api-endpoints.api';
import Config from 'react-native-config';
import Toast from 'react-native-toast-message';
import { useMutation, useQuery } from 'react-query';
import { httpTokenGet } from '../utils/utils';

import { useDispatch, useSelector } from 'react-redux';
import cartSlice, { addToCart, cartCount, cartData } from 'slices/cart.slice';
import { AppDispatch } from 'slices/store';
import { showSnackbar } from 'slices/snackbar.slice';
import { AddRemoveCart } from 'api/utils/types';
import useKiosk from '@atoms/Kiosk/useKiosk.hook';
import { useCheckoutSummaryMutation } from 'api/checkout/use-summary';
import { RootState } from 'slices/store';
import { httpTokenPut } from '../utils/utils';
import { useEnhancedNavigation } from 'hooks';
import { RouteConstants } from 'routes/constants.routes';

const withCredsHttpConfig = {
	withCredentials: true
};

async function getCartCount() {
	const withCredsHttpConfig = {
		withCredentials: true
	};
	const response = httpTokenGet<ApiResponses.GetCartCountResponse>(
		`${Config.BASE_PATH}${ApiEndpoints.CART_COUNT}`,
		withCredsHttpConfig
	);
	return response;
}

export const useCartCount = () => {
	const dispatch = useDispatch();
	return useMutation(getCartCount, {
		onSuccess: async (response) => {
			if (response?.status === 'success') {
				dispatch(cartCount({ count: response.data?.count }));
			} else {
				dispatch(cartCount({ count: 0 }));
			}
		},
		onError: (error) => {
			console.error('Error while getting Cart Count:', error);
			dispatch(cartCount({ count: 0 }));
		}
	});
};

export const useAllCartMutation = () => {
	const dispatch = useDispatch();
	return useMutation((params: any) => getAllCartItem(params), {
		onSuccess: (data) => {
			dispatch(cartData(data));
		},
		onError: (data) => {
			console.log(data, 'cart error response');
		}
	});
};

async function getAllCartItem(params = { clusterId: '' }) {
	if (params?.clusterId) {
		const queryString = new URLSearchParams(params).toString();
		const response = httpTokenGet<ApiResponses.GetCartDataResponse>(
			`${Config.BASE_PATH}${ApiEndpoints.CART}?cta=CART&${queryString}`,
			withCredsHttpConfig
		);
		return response;
	}
}

async function addOrDeleteToCart(params, data: AddRemoveCart) {
	const queryString = new URLSearchParams(params).toString();
	const withCredsHttpConfig = {
		withCredentials: true
	};
	const response = httpTokenPut(
		`${Config.BASE_PATH}${ApiEndpoints.CART}?${queryString}`,
		data,
		withCredsHttpConfig
	);
	return response;
}

export const useAddOrDeleteToCartMutation = (options?: {
	preventCheckoutSummaryUpdate?: boolean;
}) => {
	const { mutate: getCartCount } = useCartCount();
	const { mutate: getCartItems } = useAllCartMutation();
	const location = useSelector((state: RootState) => state.location);
	const checkoutData = useSelector((state: RootState) => state.cart);
	const { navigate } = useEnhancedNavigation();
	const { mutate: getCheckoutSummary, isLoading } = useCheckoutSummaryMutation();

	// const { cta } = useUI();
	const { isKiosk } = useKiosk();
	const params = {
		isKiosk
	};
	const dispatch = useDispatch<AppDispatch>();
	return useMutation((data: AddRemoveCart) => addOrDeleteToCart(params, data), {
		onSuccess: async (response) => {
			if (response?.status === 'success') {
				const requestData = {
					// cta,
					pincode: location?.pincode,
					state: location?.state,
					useWallet: checkoutData.walletAmount > 0,
					couponCode: checkoutData.couponCode || '',
					isKiosk
				};
				await getCartCount();
				getCartItems({
					state: location?.state,
					pincode: location?.pincode,
					clusterId: 1
				});
				!options?.preventCheckoutSummaryUpdate && getCheckoutSummary(requestData);

				dispatch(showSnackbar({ message: 'Cart updated', label: 'Close' }));
				navigate(RouteConstants.CartScreenRoute);
			} else {
				dispatch(showSnackbar({ message: 'Unable Add to Cart!', label: 'Close' }));
			}
		},
		onError: (error: any) => {
			dispatch(showSnackbar({ message: error.msg, label: 'Close' }));
		}
	});
};
