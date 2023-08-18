import { HomeScreen, PermissionsScreen, SplashScreen } from './export.routes';
import { RouteConstants } from './constants.routes';

const RoutesList = [
    { id: 1, name: RouteConstants.SplashScreenRoute, component: SplashScreen, options: { headerShown: false } },
    { id: 2, name: RouteConstants.HomeScreenRoute, component: HomeScreen, options: { headerShown: false } },
    { id: 2, name: RouteConstants.PermissionsScreenRoute, component: PermissionsScreen, options: { headerShown: false } },
];

export default RoutesList;
