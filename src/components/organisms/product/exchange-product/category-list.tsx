import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import ListItems from './list-Items';
import { useTheme } from '@hooks/index';
import { DefaultStyles, FontGilroy } from '@primitives/index';

const CategoryList = ({ title, data, step, defaultWidth = 158, isStepVisible = true }) => {
	const { colors } = useTheme();
	const [active, setActive] = useState<number>(0);

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
				<View style={styles.scrollViewContent}>
					{data?.map((category, index) => (
						<ListItems
							category={category}
							key={category.Id || category.id || index}
							active={active}
							defaultWidth={defaultWidth}
							index={index}
						/>
					))}
				</View>
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
		fontSize: 18
	},
	stepText: {
		fontSize: 16,
		fontWeight: 'bold'
	},
	scrollViewContent: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		flexWrap: 'wrap'
	}
});

export default CategoryList;
