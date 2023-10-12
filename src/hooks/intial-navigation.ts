import { checkMultiple, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { useDispatch } from 'react-redux';

import useEnhancedNavigation from './navigation.hook';
import { RouteConstants } from 'routes/constants.routes';
import useLocalstorage from './local-storage.hook';
import { AppDispatch } from '@slices/store';
import { authenticateUser, setToken } from '@slices/auth.slice';

const useIntialNavigation = () => {
    const { replace } = useEnhancedNavigation();
    const { checkWeatherUserHasSeenPermissions, getToken, getRefreshToken } = useLocalstorage();
    const dispatch = useDispatch<AppDispatch>();

    const redirectToWhichScreen = async () => {
        const check = await checkWeatherUserHasSeenPermissions();
        const token = await getToken();
        const refreshToken = await getRefreshToken();

        if (!check) {
            checkMultiple([PERMISSIONS.IOS.LOCATION_ALWAYS, PERMISSIONS.IOS.LOCATION_WHEN_IN_USE]).then((statuses) => {
                if (statuses[PERMISSIONS.IOS.LOCATION_ALWAYS] !== RESULTS.GRANTED || statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] !== RESULTS.GRANTED) {
                    replace(RouteConstants.PermissionsScreenRoute);
                } else {
                    replace(RouteConstants.TabsScreenRoute);
                }
            });
        } else {
            if (token && refreshToken) {
                dispatch(setToken(token));
                dispatch(authenticateUser({
                    token: token,
                    refreshToken,
                    navigateFunction: () => replace(RouteConstants.TabsScreenRoute),
                }));
            } else {
                replace(RouteConstants.TabsScreenRoute);
            }
        }
    };

    return {
        redirectToWhichScreen,
    };

};

export default useIntialNavigation;
