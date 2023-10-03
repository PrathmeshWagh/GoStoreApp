import {
	PermissionsScreen,
	SplashScreen,
	MainWebviewScreen,
	CategoriesScreen,
	ViewMoreScreen
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
		name: RouteConstants.CategoriesScreenRoute,
		component: CategoriesScreen,
		options: { headerShown: false }
	},
	{
		id: 5,
		name: RouteConstants.ViewMoreScreenRoute,
		component: ViewMoreScreen,
		options: { headerShown: false }
	}
];

export { RoutesList };
