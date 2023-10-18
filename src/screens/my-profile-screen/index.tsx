import { View, Text } from 'react-native';
import React from 'react';
import Layout from 'components/molecules/layout/layout.molecule';
import MyProfile from 'components/organisms/myProfile';

const layout = {
	menu: true,
	search: true,
	back: false,
	logo: 'https://gostor.com/icons/header/logo-invert.svg',
	cart: true,
	pincode: true
};
const MyProfileScreen = () => {
	return (
		<Layout layout={layout}>
			<MyProfile />
		</Layout>
	);
};

export default MyProfileScreen;
