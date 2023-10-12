import {
	PermissionsScreen,
	SplashScreen,
	MainWebviewScreen,
	LoginScreen,
	SignUpScreen,
	OtpScreen,
	CategoriesScreen,
	ViewMoreSimilarProductScreen,
	ProductDetailsScreen, LocationScreen, PincodeScreen, SideDrawerScreen
} from './export.routes';
import { RouteConstants } from './constants.routes';

const RoutesList = [
	{
		id: 1,
		name: RouteConstants.SplashScreenRoute,
		component: SplashScreen,
		options: { headerShown: false },
	},
	{
		id: 2,
		name: RouteConstants.PermissionsScreenRoute,
		component: PermissionsScreen,
		options: { headerShown: false },
	},
	{
		id: 3,
		name: RouteConstants.MainWebviewScreenRoute,
		component: MainWebviewScreen,
		options: { headerShown: false },
	},
	{
		id: 4,
		name: RouteConstants.LoginRoute,
		component: LoginScreen,
		options: { headerShown: false },
	},
	{
		id: 5,
		name: RouteConstants.SignUpRoute,
		component: SignUpScreen,
		options: { headerShown: false },
	},
	{
		id: 6,
		name: RouteConstants.OtpRoute,
		component: OtpScreen,
		options: { headerShown: false },
	},
	{
		id: 7,
		name: RouteConstants.ProductdeatilsScreenRoute,
		component: ProductDetailsScreen,
		options: { headerShown: false },
	},
	{
		id: 8,
		name: RouteConstants.ViewMoreSimilarProductScreenRoute,
		component: ViewMoreSimilarProductScreen,
		options: { headerShown: false },
	},
	{
		id: 9,
		name: RouteConstants.CategoriesScreenRoute,
		component: CategoriesScreen,
		options: { headerShown: false },
	},
	{
		id: 10,
		name: RouteConstants.LocationScreenRoute,
		component: LocationScreen, options: { headerShown: false },
	},
	{
		id: 11,
		name: RouteConstants.PincodeScreenRoute,
		component: PincodeScreen,
		options: { headerShown: false },
	},
	{
		id: 11,
		name: RouteConstants.SideDrawerScreenRoute,
		component: SideDrawerScreen,
		options: { headerShown: false },
	},
];

export { RoutesList };
