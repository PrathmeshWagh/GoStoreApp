// These are global hooks, so make sure the hook doesn't take any dependencies

import AsyncStorage from '@react-native-async-storage/async-storage';

import { AppTypes } from 'primitives/index';

const useLocalstorage = () => {

    const checkWeatherUserHasSeenPermissions = async () => {
        try {
            const seen = await AsyncStorage.getItem(AppTypes.UserHasSeenPermissions);
            return seen;
        } catch (e) {
            console.log(e);
        }
    };

    const saveToken = async (token: string, refreshToken: string) => {
        try {
            await AsyncStorage.setItem(AppTypes.UserToken, token);
            await AsyncStorage.setItem(AppTypes.RefreshToken, refreshToken);
        } catch (e) {
            console.log(e);
        }
    };

    const getToken = async () => {
        try {
            const userToken = await AsyncStorage.getItem(AppTypes.UserToken);
            return userToken;
        } catch (e) {
        }
    };

    const getRefreshToken = async () => {
        try {
            const refreshToken = await AsyncStorage.getItem(AppTypes.RefreshToken);
            return refreshToken;
        } catch (e) {
        }
    };

    const removeToken = async () => {
        try {
            await AsyncStorage.removeItem(AppTypes.UserToken);
        } catch (e) {
        }
    };

    const removeRefreshToken = async () => {
        try {
            await AsyncStorage.removeItem(AppTypes.RefreshToken);
        } catch (e) {
        }
    };

    const removeAll = async () => {
        try {
            await AsyncStorage.clear();
        } catch (e) {
        }
    };

    const updateAccessToken = async (token: string) => {
        try {
            await AsyncStorage.setItem(AppTypes.UserToken, token);
        } catch (e) {
            console.log(e);
        }
    };

    return {
        checkWeatherUserHasSeenPermissions,
        saveToken,
        getToken,
        removeToken,
        removeAll,
        getRefreshToken,
        removeRefreshToken,
        updateAccessToken,
    };

};

export default useLocalstorage;
