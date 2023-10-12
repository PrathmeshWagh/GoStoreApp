import axios from 'axios';
import { getAccessToken, getRefreshToken } from './get-token';
import { ApiEndpoints } from './api-endpoints.api';
import { LOCAL_STORAGE_KEYS } from 'helpers';
import Config from 'react-native-config';

const httpConfig = {
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json'
	} as Record<string, string>
};

const refreshToken = async (token) => {
	const response = await axios.post(`${Config.BASE_PATH}${ApiEndpoints.REFRESH_TOKEN}`, {
		refreshToken: token
	});
	localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, response.data.accessToken);
	return response.data.accessToken;
};

const httpTokenGet = async <Data = any>(url, addConfig = {}): Promise<Data> => {
	const token = await getAccessToken();
	if (token) {
		httpConfig.headers['Authorization'] = 'Bearer '.concat(token);
	}
	return axios
		.get(url, { ...httpConfig, ...addConfig })
		.then(async (response) => {
			if (response.data.msg === 'Invalid Token') {
			}
			if (response.data.msg === 'Token Expired') {
				let refreshResponse = await refreshToken(getRefreshToken());
				httpConfig.headers['Authorization'] = 'Bearer '.concat(refreshResponse);
				return axios.get(url, httpConfig).then((res) => {
					if (res.data.msg === 'Invalid Token') {
					}
					if (res.data.status !== 'error') return res.data;
					throw res.data;
				});
			}
			if (response.data.status !== 'error') return response.data;
			throw response.data;
		})
		.catch((err) => {
			throw err;
		});
};

export { httpTokenGet };
