import { LOCAL_STORAGE_KEYS } from 'helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';

export const getAccessToken = () => {
	return AsyncStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
};

export const getRefreshToken = () => {
	return AsyncStorage.getItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
};

export const getTokenData = async () => {
	let access = await AsyncStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
	if (access) {
		try {
			const decodedToken = jwt_decode(access);
			return decodedToken;
		} catch (e) {
			console.log('Unable to decode token. Token found:', access);
			AsyncStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
			return null;
		}
	} else {
		return null;
	}
};
