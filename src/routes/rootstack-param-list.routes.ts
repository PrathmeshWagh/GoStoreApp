import { RouteConstants } from './constants.routes';

export type RootStackParamList = {
    [RouteConstants.SplashScreenRoute]: undefined;
    [RouteConstants.HomeScreenRoute]: undefined;
    [RouteConstants.PermissionsScreenRoute]: undefined;
    [RouteConstants.TabsScreenRoute]: undefined;
    [RouteConstants.MainWebviewScreenRoute]: undefined;
    [RouteConstants.LocationScreenRoute]: undefined;
    [RouteConstants.PincodeScreenRoute]: undefined;
    // [RouteConstants.OtpVerificationScreenRoute]: { mobileNumber: string, name?: string, role?: string, type: 'signup' | 'login' };
};
