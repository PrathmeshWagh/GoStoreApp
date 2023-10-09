import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@hooks/index';

interface ListItem {
	Id: number;
	Description: string;
	Name?: string;
	goCareCategoryName?: string;
	wareranties?: string;
	categoryName?: string;
	priceRange?: string;
}
interface ListItemsProps {
	category: ListItem;
	event?: any;
	active: number;
	defaultWidth: number;
	index: number;
}

const ListItems = (props: ListItemsProps) => {
	const { category, event, active, defaultWidth = 158, index = 0 } = props;

	const { colors } = useTheme();

	return (
		<TouchableOpacity
			style={[
				styles.container,
				{
					width: defaultWidth,
					borderColor: active === (category?.Id || index) ? colors.grey : colors.secondary
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
