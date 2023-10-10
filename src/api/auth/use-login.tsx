import axios from 'axios';
import { useMutation } from 'react-query';
import { ApiEndpoints } from '../utils/api-endpoints.api';
import { LoginInputType, LoginMutationType } from '../utils/types';
import Config from 'react-native-config';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOCAL_STORAGE_KEYS } from 'helpers';
import { useEnhancedNavigation } from '@hooks/index';
import { RouteConstants } from 'routes/constants.routes';

export const LoginWithNumber = async function login(input: LoginInputType) {
	const data = {
		username: input.mobile,
		otp: input.otp,
		isWO: 1,
		isNewUser: input.isNewUser
	};
	const withCredsHttpConfig = {
		withCredentials: true
	};
	const response = await axios.post(
		`${Config.BASE_PATH}${ApiEndpoints.LOGIN}`,
		data,
		withCredsHttpConfig
	);

	return response;
};

export const useLoginMutation = () => {
	const { navigate, router } = useEnhancedNavigation();

	return useMutation((input: LoginInputType) => LoginWithNumber(input), {
		onSuccess: (data: any) => {
			if (data?.data?.status === 'error') {
				Toast.show({
					type: 'gostor_type',
					props: { msg: data?.data?.msg },
					position: 'bottom'
				});
			} else {
				//  AsyncStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, data.data.token.accessToken);
				// AsyncStorage.setItem(ASYNC_KEYS.REFRESH_TOKEN, data?.data?.token?.refreshToken);
				// AsyncStorage.setItem(ASYNC_KEYS.GOSTOR_TOKEN, data?.data?.goStoreTokenInfo?.accessToken);
				// AsyncStorage.setItem(ASYNC_KEYS.GOSTOR_REFRESH_TOKEN, data?.data?.goStoreTokenInfo?.refreshToken);
				Toast.show({
					type: 'gostor_type',
					props: { msg: 'Logged in' },
					position: 'bottom'
				});
				navigate(RouteConstants.HomeScreenRoute);
			}
		},
		onError: (data) => {
			Toast.show({
				type: 'gostor_type',
				props: { msg: 'Network Error' },
				position: 'bottom'
			});
		}
	});
};
