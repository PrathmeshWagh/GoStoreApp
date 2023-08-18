import { checkMultiple, PERMISSIONS, RESULTS } from 'react-native-permissions';
import useNavigation from './navigation.hook';
import { RouteConstants } from 'routes/constants.routes';

const useIntialNavigation = () => {
    const { replace } = useNavigation();

    const redirectToWhichScreen = () => {

        checkMultiple([PERMISSIONS.IOS.LOCATION_ALWAYS, PERMISSIONS.IOS.LOCATION_WHEN_IN_USE]).then((statuses) => {
            if (statuses[PERMISSIONS.IOS.LOCATION_ALWAYS] !== RESULTS.GRANTED || statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] !== RESULTS.GRANTED) {
                replace(RouteConstants.PermissionsScreenRoute);
            } else {
                replace(RouteConstants.HomeScreenRoute);
            }
        });
    };

    return {
        redirectToWhichScreen,
    };

};

export default useIntialNavigation;
