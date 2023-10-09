import { RouteConstants } from './constants.routes';

export type RootStackParamList = {
	[RouteConstants.SplashScreenRoute]: undefined;
	[RouteConstants.HomeScreenRoute]: undefined;
	[RouteConstants.StoreScreenRoute]: undefined;
	[RouteConstants.PermissionsScreenRoute]: undefined;
	[RouteConstants.TabsScreenRoute]: undefined;
	[RouteConstants.MainWebviewScreenRoute]: undefined;
	[RouteConstants.LoginRoute]: undefined;
	[RouteConstants.SignUpRoute]: undefined;
	[RouteConstants.OtpRoute]: { mobileNumber: String };
	[RouteConstants.ProductdeatilsScreenRoute]: { item: any; categories: any };
	[RouteConstants.CategoriesScreenRoute]: any;
	[RouteConstants.ViewMoreSimilarProductScreenRoute]: undefined;
	[RouteConstants.LocationScreenRoute]: undefined;
	[RouteConstants.PincodeScreenRoute]: undefined;
};
