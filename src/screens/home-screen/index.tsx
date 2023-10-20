import React, {TouchableOpacity, Text} from 'react-native';

import Layout from '@molecules/layout/layout.molecule';
import Home from '@organisms/home/home.organism';
import { useEnhancedNavigation } from '@hooks/index';
import { RouteConstants } from 'routes/constants.routes';

const layout = {
	menu: true,
	search: false,
	back: false,
	logo: 'https://gostor.com/icons/header/logo-invert.svg',
	cart: true,
	pincode: true
};

const HomeScreen = () => {
	const {navigate} = useEnhancedNavigation()
	return (
		<Layout layout={layout}>
			<TouchableOpacity
				onPress={() => {
					navigate(RouteConstants.LoginRoute);
				}}
			>
				<Text>Login</Text>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => {
					navigate(RouteConstants.CartScreenRoute);
				}}
			>
				<Text>Cart</Text>
			</TouchableOpacity>
			<Home />
		</Layout>
	);
};

export default HomeScreen;
