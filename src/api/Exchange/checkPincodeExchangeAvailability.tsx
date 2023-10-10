import axios from 'axios';

import { useMutation } from 'react-query';
import Config from 'react-native-config';
import { ApiEndpoints } from '../utils/api-endpoints.api';

type CheckPincodeServiceabilityParams = {
	pincode: any;
};

export const checkPincodeServiceability = (params: CheckPincodeServiceabilityParams) => {
	return axios.get(`${Config.BASE_PATH}${ApiEndpoints.EXCHANGE_PINCODE}${params}`);
};

export const useCheckPincodeExchangeMutation = () => {
	return useMutation((params: any) => checkPincodeServiceability(params));
};
