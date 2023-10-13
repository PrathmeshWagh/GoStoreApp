import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Layout from '@molecules/layout/layout.molecule';
import Cart from '@organisms/cart/cart.organism';

export default function CartScreen() {
	const layout = {
		menu: false,
		search: true,
		back: true,
		logo: 'https://gostor.com/icons/header/logo-invert.svg',
		cart: true,
		pincode: true
	};
	return (
		<Layout layout={layout}>
			<Cart />
		</Layout>
	);
}

const styles = StyleSheet.create({});
