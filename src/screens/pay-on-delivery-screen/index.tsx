import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Layout from 'components/molecules/layout/layout.molecule';
import PayOnDelivery from 'components/organisms/payment/pay-on-delivery';

const layout = {
	menu: true,
	search: true,
	back: false,
	logo: 'https://gostor.com/icons/header/logo-invert.svg',
	cart: true,
	pincode: true
};

const PayOnDeliveryScreen = () => {
	return (
		<Layout layout={layout}>
			<PayOnDelivery />
		</Layout>
	);
};

export default PayOnDeliveryScreen;

const styles = StyleSheet.create({});
