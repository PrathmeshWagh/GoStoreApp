import axios from 'axios';

import { useMutation } from 'react-query';
import Config from 'react-native-config';
import { ApiEndpoints } from '../utils/api-endpoints.api';

type CheckPincodeServiceabilityParams = {
	productId: string;
	pincode: string;
};

export const checkPincodeServiceability = (params: CheckPincodeServiceabilityParams) => {
	return axios.get<{ serviceability: boolean }>(
		`${Config.BASE_PATH_INVENTORY}${ApiEndpoints.CHECK_PINCODE_SERVICEABILITY}`,
		{ params }
	);
};

export const useCheckPincodeServiceabilityMutation = () => {
	return useMutation((params: CheckPincodeServiceabilityParams) =>
		checkPincodeServiceability(params)
	);
};
