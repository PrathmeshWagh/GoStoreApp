import axios from 'axios';
import { useMutation } from 'react-query';
import Config from 'react-native-config';
import { useDispatch, useSelector } from 'react-redux';

import { ApiEndpoints } from '../utils/api-endpoints.api';
import { LoginInputType } from '../utils/types';
import { useEnhancedNavigation } from '@hooks/index';
import { AppDispatch, RootState } from '@slices/store';
import { showSnackbar } from '@slices/snackbar.slice';
import { authenticateUser } from '@slices/auth.slice';

export const LoginWithNumber = async function login(input: LoginInputType) {
	const data = {
		username: input.mobile,
		otp: input.otp,
		isWO: 1,
		isNewUser: input.isNewUser,
	};
	const withCredsHttpConfig = {
		withCredentials: true,
	};
	const response = await axios.post(
		`${Config.BASE_PATH}${ApiEndpoints.LOGIN}`,
		data,
		withCredsHttpConfig
	);

	return response;
};

export const useLoginMutation = () => {
	const { navigate } = useEnhancedNavigation();
	const dispatch = useDispatch<AppDispatch>();
	const ui = useSelector((state: RootState) => state.ui);

	return useMutation((input: LoginInputType) => LoginWithNumber(input), {
		onSuccess: (data: any) => {
			if (data?.data?.status === 'error') {
				dispatch(showSnackbar({ message: data?.data?.msg, label: 'Close' }));
			} else {
				dispatch(showSnackbar({ message: 'Logged in!', label: 'Close' }));
				dispatch(authenticateUser({
                    token: data?.data?.token?.accessToken,
					refreshToken: data?.data?.token?.refreshToken,
                    navigateFunction: () => navigate(ui.loginRedirect),
				}));
			}
		},
		onError: () => {
			dispatch(showSnackbar({ message: 'Network error.', label: 'Close' }));
		},
	});
};
