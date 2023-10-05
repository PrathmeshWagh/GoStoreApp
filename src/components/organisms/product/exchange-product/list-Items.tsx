import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ListItems = ({ category, event, active, defaultWidth = 158, index = 0 }: any) => {
	return (
		<TouchableOpacity
			style={[
				styles.container,
				{
					width: defaultWidth,
					borderColor: active === (category?.Id || index) ? 'grey' : 'transparent'
				}
			]}
			onPress={() =>
				event(
					category?.Id || index,
					category?.Description ||
						category?.Name ||
						category?.goCareCategoryName ||
						category?.wareranties
				)
			}
		>
			<Text style={[styles.text, { color: active === (category?.Id || index) ? 'grey' : 'grey' }]}>
				{category?.Description || category?.Name || category?.categoryName || category?.priceRange}
			</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		borderWidth: 1,
		borderRadius: 8,
		padding: 10,
		marginHorizontal: 5,
		marginBottom: 10,
		alignItems: 'center'
	},
	text: {
		fontSize: 12,
		textAlign: 'center'
	}
});

export default ListItems;
