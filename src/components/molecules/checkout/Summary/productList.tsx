import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { DefaultStyles, FontGilroy } from '@primitives/index';
import ProductCart from './productcard';
import { RootState } from '@slices/store';
import { useSelector } from 'react-redux';

export default function ProductList() {
	const count = useSelector((state: RootState) => state.cart);

	return (
		<View>
			{count > 0 ? (
				<Text style={styles.text}>
					{count} {count > 1 ? 'items' : 'item'} in the cart
				</Text>
			) : null}
			;
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
