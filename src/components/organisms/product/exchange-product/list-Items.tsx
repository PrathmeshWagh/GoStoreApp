import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ListItems = ({ category, event, active, defaultWidth = 158, index = 0 }: any) => {
	return (
		<TouchableOpacity
			style={[
				styles.container,
				{
					width: defaultWidth,
					borderColor: active === (category?.Id || index) ? 'grey' : '#000'
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
		paddingVertical: 12,
		paddingHorizontal: 15,
		width: '48%',
		borderRadius: 12,
		marginBottom: 10
	},
	text: {
		fontSize: 12,
		textAlign: 'center'
	}
});

export default ListItems;
