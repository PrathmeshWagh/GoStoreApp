import axios from 'axios';
import { useMutation } from 'react-query';
import { RegisterInputType } from '../utils/types';
import { ApiEndpoints } from '../utils/api-endpoints.api';
import Config from 'react-native-config';
import Toast from 'react-native-toast-message';
import { useUI } from 'context/ui.context';
import { useEnhancedNavigation } from '@hooks/index';
import { RouteConstants } from 'routes/constants.routes';

export const GenerateOTP = async (values: RegisterInputType, isNewUser: boolean) => {
	const data = {
		username: values.mobile,
		role_value: 'wo_customer',
		isWO: 1,
		isNewUser
	};

	const response = await axios.post(`${Config.BASE_PATH}${ApiEndpoints.GENERATE_OTP}`, data);

	return response;
};

export const useGenerateOtpMutation = () => {
	const { setNewUser, isNewUser, setMessages } = useUI();
	const { navigate } = useEnhancedNavigation();
	return useMutation((values: RegisterInputType) => GenerateOTP(values, isNewUser), {
		onSuccess: (data: any) => {
			if (data?.data?.status === 'success') {
				Toast.show({
					type: 'gostor_type',
					props: { msg: data?.data?.msg },
					position: 'bottom'
				});
				navigate(RouteConstants.OtpRoute, { mobileNumber: JSON.parse(data.config.data).username });
			} else if (data?.data?.status === 'error' && data?.data?.isNewUser) {
				navigate(RouteConstants.SignUpRoute);
			} else {
				Toast.show({
					type: 'gostor_type',
					props: { msg: data?.data?.msg },
					position: 'bottom'
				});
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
