import axios from 'axios';
import { useMutation } from 'react-query';
import Config from 'react-native-config';
import { useDispatch } from 'react-redux';

import { useUI } from 'context/ui.context';
import { useEnhancedNavigation } from '@hooks/index';
import { RouteConstants } from '@routes/constants.routes';
import { AppDispatch } from '@slices/store';
import { RegisterInputType } from '../utils/types';
import { ApiEndpoints } from '../utils/api-endpoints.api';
import { showSnackbar } from '@slices/snackbar.slice';

export const GenerateOTP = async (values: RegisterInputType, isNewUser: boolean) => {
	const data = {
		username: values.mobile,
		role_value: 'wo_customer',
		isWO: 1,
		isNewUser,
	};

	const response = await axios.post(`${Config.BASE_PATH}${ApiEndpoints.GENERATE_OTP}`, data);

	return response;
};

export const useGenerateOtpMutation = () => {
	const { isNewUser } = useUI();
	const { navigate } = useEnhancedNavigation();
	const dispatch = useDispatch<AppDispatch>();

	return useMutation((values: RegisterInputType) => GenerateOTP(values, isNewUser), {
		onSuccess: (data: any) => {
			if (data?.data?.status === 'success') {
				dispatch(showSnackbar({ message: 'Otp generated successfully!', label: 'Close' }));
				navigate(RouteConstants.OtpRoute, { mobileNumber: JSON.parse(data.config.data).username });
			} else if (data?.data?.status === 'error' && data?.data?.isNewUser) {
				navigate(RouteConstants.SignUpRoute);
			} else {
				dispatch(showSnackbar({ message: data?.data?.msg, label: 'Close' }));
			}
		},
		onError: () => {
			dispatch(showSnackbar({ message: 'Network Error', label: 'Close' }));
		},
	});
};
