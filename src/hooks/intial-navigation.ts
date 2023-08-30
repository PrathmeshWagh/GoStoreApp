import { checkMultiple, PERMISSIONS, RESULTS } from 'react-native-permissions';

import useNavigation from './navigation.hook';
import { RouteConstants } from 'routes/constants.routes';
import useLocalstorage from './local-storage.hook';

const useIntialNavigation = () => {
    const { replace } = useNavigation();
    const { checkWeatherUserHasSeenPermissions } = useLocalstorage();

    const redirectToWhichScreen = async () => {
        const check = await checkWeatherUserHasSeenPermissions();

        if (!check) {
            checkMultiple([PERMISSIONS.IOS.LOCATION_ALWAYS, PERMISSIONS.IOS.LOCATION_WHEN_IN_USE]).then((statuses) => {
                if (statuses[PERMISSIONS.IOS.LOCATION_ALWAYS] !== RESULTS.GRANTED || statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] !== RESULTS.GRANTED) {
                    replace(RouteConstants.PermissionsScreenRoute);
                } else {
                    replace(RouteConstants.TabsScreenRoute);
                }
            });
        } else {
            replace(RouteConstants.TabsScreenRoute);
        }
    };

    return {
        redirectToWhichScreen,
    };

};

export default useIntialNavigation;
