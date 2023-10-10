import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Layout from '@molecules/layout/layout.molecule';
import Home from '@organisms/home/home.organism';
import { RouteConstants } from '@routes/constants.routes';
import { useEnhancedNavigation } from '@hooks/index';

const layout = {
    menu: true,
    search: false,
    back: false,
    logo: 'https://gostor.com/icons/header/logo-invert.svg',
    cart: false,
    pincode: true,
};

const HomeScreen = () => {
	const { navigate } = useEnhancedNavigation();
	return (
		<Layout layout={layout}>
			<TouchableOpacity
				onPress={() => {
					navigate(RouteConstants.LoginRoute);
				}}
			>
				<Text>Login</Text>
			</TouchableOpacity>
			<Home />
		</Layout>
	);
};

export default HomeScreen;
