import { PermissionsScreen, SplashScreen, MainWebviewScreen, LocationScreen, PincodeScreen } from './export.routes';
import { RouteConstants } from './constants.routes';

const RoutesList = [
    { id: 1, name: RouteConstants.SplashScreenRoute, component: SplashScreen, options: { headerShown: false } },
    { id: 2, name: RouteConstants.PermissionsScreenRoute, component: PermissionsScreen, options: { headerShown: false } },
    { id: 3, name: RouteConstants.MainWebviewScreenRoute, component: MainWebviewScreen, options: { headerShown: false } },
    { id: 4, name: RouteConstants.LocationScreenRoute, component: LocationScreen, options: { headerShown: false } },
    { id: 5, name: RouteConstants.PincodeScreenRoute, component: PincodeScreen, options: { headerShown: false } },
];

export {
    RoutesList,
};
