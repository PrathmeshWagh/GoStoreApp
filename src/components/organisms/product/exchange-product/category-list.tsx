import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import ListItems from './list-Items';

const CategoryList = ({ title, data, step, defaultWidth = 158, isStepVisible = true }) => {
	const [active, setActive] = useState(0);

	const myRef = useRef(null);

	if (!data?.length) return null;

	return (
		<View style={styles.container}>
			{isStepVisible && (
				<View style={styles.header}>
					<Text style={styles.headerText}>
						{title} <Text style={styles.stepText}>({step}/4)</Text>
					</Text>
				</View>
			)}

			<ScrollView>
				{data?.map((category, index) => (
					<ListItems
						category={category}
						key={category.Id || category.id || index}
						active={active}
						defaultWidth={defaultWidth}
						index={index}
					/>
				))}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginTop: 10
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 10
	},
	headerText: {
		fontSize: 18,
		color: 'grey'
	},
	stepText: {
		fontSize: 16,
		fontWeight: 'bold',
		color: 'grey'
	},
	scrollViewContent: {
		flexDirection: 'row',
		flexWrap: 'wrap'
	}
});

export default CategoryList;
