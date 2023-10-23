import {
	PermissionsScreen,
	SplashScreen,
	MainWebviewScreen,
	LoginScreen,
	SignUpScreen,
	OtpScreen,
	CategoriesScreen,
	ViewMoreSimilarProductScreen,
	ProductDetailsScreen,
	LocationScreen,
	PincodeScreen,
	CartScreen,
	UserAccountScreen,
	MyProfileScreen,
	CustomerSupportScreen,
	MyOrderScreen,
	SideDrawerScreen,
	VideoCallScreen,
	SearchScreen
} from './export.routes';
import { RouteConstants } from './constants.routes';

const RoutesList = [
	{
		id: 1,
		name: RouteConstants.SplashScreenRoute,
		component: SplashScreen,
		options: { headerShown: false }
	},
	{
		id: 2,
		name: RouteConstants.PermissionsScreenRoute,
		component: PermissionsScreen,
		options: { headerShown: false }
	},
	{
		id: 3,
		name: RouteConstants.MainWebviewScreenRoute,
		component: MainWebviewScreen,
		options: { headerShown: false }
	},
	{
		id: 4,
		name: RouteConstants.LoginRoute,
		component: LoginScreen,
		options: { headerShown: false }
	},
	{
		id: 5,
		name: RouteConstants.SignUpRoute,
		component: SignUpScreen,
		options: { headerShown: false }
	},
	{
		id: 6,
		name: RouteConstants.OtpRoute,
		component: OtpScreen,
		options: { headerShown: false }
	},
	{
		id: 7,
		name: RouteConstants.ProductdeatilsScreenRoute,
		component: ProductDetailsScreen,
		options: { headerShown: false }
	},
	{
		id: 8,
		name: RouteConstants.ViewMoreSimilarProductScreenRoute,
		component: ViewMoreSimilarProductScreen,
		options: { headerShown: false }
	},
	{
		id: 9,
		name: RouteConstants.CategoriesScreenRoute,
		component: CategoriesScreen,
		options: { headerShown: false }
	},
	{
		id: 10,
		name: RouteConstants.LocationScreenRoute,
		component: LocationScreen,
		options: { headerShown: false }
	},
	{
		id: 11,
		name: RouteConstants.PincodeScreenRoute,
		component: PincodeScreen,
		options: { headerShown: false }
	},
	{
		id: 12,
		name: RouteConstants.CartScreenRoute,
		component: CartScreen,
		options: { headerShown: false }
	},
	{
		id: 13,
		name: RouteConstants.UserAccountScreenRoute,
		component: UserAccountScreen,
		options: { headerShown: false }
	},
	{
		id: 14,
		name: RouteConstants.MyProfileScreenRoute,
		component: MyProfileScreen,
		options: { headerShown: false }
	},
	{
		id: 15,
		name: RouteConstants.CustomerSupportScreenRoute,
		component: CustomerSupportScreen,
		options: { headerShown: false }
	},
	{
		id: 16,
		name: RouteConstants.MyOrderScreenRoute,
		component: MyOrderScreen,
		options: { headerShown: false }
	},
	{
		id: 17,
		name: RouteConstants.SideDrawerScreenRoute,
		component: SideDrawerScreen,
		options: { headerShown: false }
	},
	{
		id: 18,
		name: RouteConstants.VideoCallScreenRoute,
		component: VideoCallScreen,
		options: { headerShown: false }
	},
	{
		id: 19,
		name: RouteConstants.SearchScreenRoute,
		component: SearchScreen,
		options: { headerShown: false }
	}
];

export { RoutesList };
