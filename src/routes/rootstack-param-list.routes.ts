import { RouteConstants } from './constants.routes';

export type RootStackParamList = {
	[RouteConstants.SplashScreenRoute]: undefined;
	[RouteConstants.HomeScreenRoute]: undefined;
	[RouteConstants.PermissionsScreenRoute]: undefined;
	[RouteConstants.TabsScreenRoute]: undefined;
	[RouteConstants.MainWebviewScreenRoute]: undefined;
	[RouteConstants.CategoriesScreenRoute]: { url: string };
	// [RouteConstants.OtpVerificationScreenRoute]: { mobileNumber: string, name?: string, role?: string, type: 'signup' | 'login' };
};
