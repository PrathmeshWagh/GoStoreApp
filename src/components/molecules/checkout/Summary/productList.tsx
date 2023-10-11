import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { DefaultStyles, FontGilroy } from '@primitives/index';
import ProductCart from './productcard';

export default function ProductList() {
	return (
		<View>
			<Text style={styles.text}>1 item in the cart</Text>
			<ProductCart />
		</View>
	);
}

const styles = StyleSheet.create({
	text: {
		marginTop: 10,
		fontSize: 13,
		fontFamily: FontGilroy.Medium
	}
});
