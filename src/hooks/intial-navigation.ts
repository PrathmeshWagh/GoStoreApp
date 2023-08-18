import { checkMultiple, PERMISSIONS, RESULTS } from 'react-native-permissions';
import useNavigation from './navigation.hook';
import { RouteConstants } from 'routes/constants.routes';

// const PLATFORM_PERMISSIONS = Platform.select<
//     typeof PERMISSIONS.ANDROID | typeof PERMISSIONS.IOS | {}
// >({
//     android: PERMISSIONS.ANDROID,
//     ios: PERMISSIONS.IOS,
//     default: {},
// });

// const PERMISSIONS_VALUES: Permission[] = Object.values(PLATFORM_PERMISSIONS);

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
