import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import EMIDetails from 'components/organisms/payment/emi-details';
import Layout from 'components/molecules/layout/layout.molecule';

const layout = {
	menu: true,
	search: true,
	back: false,
	logo: 'https://gostor.com/icons/header/logo-invert.svg',
	cart: true,
	pincode: true
};

const EMIDetailsScreen = () => {
	return (
		<Layout layout={layout}>
			<EMIDetails />
		</Layout>
	);
};

export default EMIDetailsScreen;

const styles = StyleSheet.create({});
