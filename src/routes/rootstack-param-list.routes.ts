import { RouteConstants } from './constants.routes';

export type RootStackParamList = {
	[RouteConstants.SplashScreenRoute]: undefined;
	[RouteConstants.HomeScreenRoute]: undefined;
	[RouteConstants.StoreScreenRoute]: undefined;
	[RouteConstants.PermissionsScreenRoute]: undefined;
	[RouteConstants.TabsScreenRoute]: undefined;
	[RouteConstants.MainWebviewScreenRoute]: undefined;
	// [RouteConstants.OtpVerificationScreenRoute]: { mobileNumber: string, name?: string, role?: string, type: 'signup' | 'login' };
	[RouteConstants.LoginRoute]: undefined;
	[RouteConstants.SignUpRoute]: undefined;
	[RouteConstants.OtpRoute]: { mobileNumber: String };
	[RouteConstants.ProductdeatilsScreenRoute]: undefined;
	[RouteConstants.PermissionsScreenRoute]: undefined;
	[RouteConstants.TabsScreenRoute]: undefined;
	[RouteConstants.MainWebviewScreenRoute]: undefined;
	[RouteConstants.CategoriesScreenRoute]: any;
};
