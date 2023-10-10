// const httpTokenGet = async <Data = any>(url, addConfig = {}): Promise<Data> => {
// 	if (typeof window !== 'undefined') {
// 		const checkApp = await isApp(window);
// 		httpConfig.headers['x-user-platform'] = checkApp ? 'app' : 'web';
// 		httpConfig.headers['x-device-id'] = window['visitorId'];
// 	}
// 	const token = getAccessToken();
// 	if (token) {
// 		httpConfig.headers['Authorization'] = 'Bearer '.concat(token);
// 	}
// 	return axios
// 		.get(url, { ...httpConfig, ...addConfig })
// 		.then(async (response) => {
// 			if (response.data.msg === 'Invalid Token') {
// 				await logoutUser();
// 			}
// 			if (response.data.msg === 'Token Expired') {
// 				let refreshResponse = await refreshToken(getRefreshToken());
// 				httpConfig.headers['Authorization'] = 'Bearer '.concat(refreshResponse);
// 				return axios.get(url, httpConfig).then((res) => {
// 					if (res.data.msg === 'Invalid Token') {
// 						logoutUser().catch(() => null);
// 					}
// 					if (res.data.status !== 'error') return res.data;
// 					throw res.data;
// 				});
// 			}
// 			if (response.data.status !== 'error') return response.data;
// 			throw response.data;
// 		})
// 		.catch((err) => {
// 			throw err;
// 		});
// };
