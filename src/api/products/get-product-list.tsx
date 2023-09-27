// import { useState } from 'react';
// import Config from 'react-native-config';
// import axios from 'axios';
// import useKiosk from 'components/atoms/Kiosk/useKiosk.hook';
// import { useMutation } from 'react-query';

// import { ApiEndpoints } from 'api/utils/api-endpoints.api';

// interface Props {
// 	params?: any;
// 	productData?: CustomTypes.ProductQueryParams;
// 	rootKey?: any;
// }

// const getProducts = async ({ params, productData, rootKey }: Props) => {
// 	const { isKiosk } = useKiosk();
// 	// const queryString = new URLSearchParams(params).toString();

// 	// const url = `${rootKey === 'category' ? Config.BASE_PATH : Config.BASE_PATH_INVENTORY}${
// 	// 	ApiEndpoints.GET_PRODUCTS
// 	// }?queryStr=${encodeURIComponent(JSON.stringify(productData))}&${queryString}`;

// 	const response = await axios.get(
// 		`${Config.BASE_PATH_INVENTORY}${ApiEndpoints.GET_PRODUCTS}?queryStr=${encodeURIComponent(
// 			JSON.stringify(params)
// 		)}&${isKiosk}`
// 	);
// 	return response;
// };

// export const useGetProducts = () => {
// 	// const [isLoading, setIsLoading] = useState<boolean>(false);
// 	// const [response, setResponse] = useState(null);
// 	// const [error, setError] = useState<string | null>(null);
// 	// const mutate = async ({ params = {}, productData, rootKey = 'category' }: Props) => {
// 	// 	setIsLoading(true);
// 	// 	try {
// 	// 		const response = await getProducts({
// 	// 			params,
// 	// 			productData,
// 	// 			rootKey
// 	// 		});
// 	// 		if (response?.data?.status === 'success' && response?.data?.data?.length > 0) {
// 	// 			setResponse({
// 	// 				data: response?.data?.data,
// 	// 				pageNumber: productData?.page,
// 	// 				pageSizeRequested: productData?.pageSize,
// 	// 				pageSizeGenerated: response?.data?.data?.length
// 	// 			});
// 	// 		} else {
// 	// 			setError('Something went wrong!');
// 	// 		}
// 	// 		setIsLoading(false);
// 	// 	} catch (error) {
// 	// 		console.log('Get Products Error', error);
// 	// 		setError(error);
// 	// 		setIsLoading(false);
// 	// 	}
// 	// };
// 	// return {
// 	// 	mutate,
// 	// 	isLoading,
// 	// 	response,
// 	// 	error
// 	// };

// 	return useMutation((input: LoginInputType) => getProducts(input), {
// 		onSuccess: (response) => {
// 			return response;
// 		},
// 		onError: (error: { status: string; msg: string }) => {
// 			console.error('Categories Carousel Error', error);
// 		}
// 	});
// };

// // import axios from 'axios';
// // import { useMutation } from 'react-query';
// // import { ApiEndpoints } from '../utils/api-endpoints.api';
// // import { LoginInputType, LoginMutationType } from '../utils/types';
// // import Config from 'react-native-config';
// // import Toast from 'react-native-toast-message';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import { LOCAL_STORAGE_KEYS } from 'helpers';
// // import { useEnhancedNavigation } from '@hooks/index';
// // import { RouteConstants } from 'routes/constants.routes';

// // export const LoginWithNumber = async function login(input: LoginInputType) {
// // 	const data = {
// // 		username: input.mobile,
// // 		otp: input.otp,
// // 		isWO: 1,
// // 		isNewUser: input.isNewUser
// // 	};
// // 	const withCredsHttpConfig = {
// // 		withCredentials: true
// // 	};
// // 	const response = await axios.post(
// // 		`${Config.BASE_PATH}${ApiEndpoints.LOGIN}`,
// // 		data,
// // 		withCredsHttpConfig
// // 	);
// // 	console.log('response in login', response);

// // 	return response;
// // };

// // export const useLoginMutation = () => {
// // 	const { navigate, router } = useEnhancedNavigation();

// // 	return useMutation((input: LoginInputType) => LoginWithNumber(input), {
// // 		onSuccess: (data: any) => {
// // 			if (data?.data?.status === 'error') {
// // 				Toast.show({
// // 					type: 'gostor_type',
// // 					props: { msg: data?.data?.msg },
// // 					position: 'bottom'
// // 				});
// // 			} else {
// // 				//  AsyncStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, data.data.token.accessToken);
// // 				// AsyncStorage.setItem(ASYNC_KEYS.REFRESH_TOKEN, data?.data?.token?.refreshToken);
// // 				// AsyncStorage.setItem(ASYNC_KEYS.GOSTOR_TOKEN, data?.data?.goStoreTokenInfo?.accessToken);
// // 				// AsyncStorage.setItem(ASYNC_KEYS.GOSTOR_REFRESH_TOKEN, data?.data?.goStoreTokenInfo?.refreshToken);
// // 				Toast.show({
// // 					type: 'gostor_type',
// // 					props: { msg: 'Logged in' },
// // 					position: 'bottom'
// // 				});
// // 				navigate(RouteConstants.HomeScreenRoute);
// // 			}
// // 		},
// // 		onError: (data) => {
// // 			Toast.show({
// // 				type: 'gostor_type',
// // 				props: { msg: 'Network Error' },
// // 				position: 'bottom'
// // 			});
// // 		}
// // 	});
// // };

import { useState } from 'react';
import Config from 'react-native-config';
import axios from 'axios';
import useKiosk from 'components/atoms/Kiosk/useKiosk.hook';
import { useMutation } from 'react-query';
import { ApiEndpoints } from 'api/utils/api-endpoints.api';

interface Props {
	params?: any;
	productData?: CustomTypes.ProductQueryParams;
	rootKey?: any;
}

const getProducts = async ({ params, productData, rootKey }: Props) => {
	const { isKiosk } = useKiosk();

	const response = await axios.get(
		`${Config.BASE_PATH_INVENTORY}${ApiEndpoints.GET_PRODUCTS}?queryStr=${encodeURIComponent(
			JSON.stringify(params)
		)}&${isKiosk}`
	);
	return response;
};

export const useGetProducts = () => {
	return useMutation((input: Props) => getProducts(input), {
		onSuccess: (response) => {
			return response;
		},
		onError: (error: { status: string; msg: string }) => {
			console.error('Categories Carousel Error', error);
		}
	});
};
