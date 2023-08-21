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

    return {
        checkWeatherUserHasSeenPermissions,
    };

};

export default useLocalstorage;
