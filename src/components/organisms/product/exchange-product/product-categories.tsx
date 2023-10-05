import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { CustomButtom } from 'components/atoms';
import { DefaultStyles, FontGilroy } from '@primitives/index';
import { useTheme } from '@hooks/index';
import CategoryList from './category-list';

const sampleData1 = [
	{
		Id: 1,
		Description: 'Category 1'
	},
	{
		Id: 2,
		Description: 'Category 2'
	},
	{
		Id: 3,
		Description: 'Category 3'
	}
];

export default function ProductCategories() {
	const { colors } = useTheme();
	return (
		<View>
			<View>
				<Text style={{ fontFamily: FontGilroy.Medium, fontSize: 18, marginVertical: 10 }}>
					Selected Product
				</Text>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
					<Text
						style={{
							borderWidth: 1,
							paddingVertical: 12,
							paddingHorizontal: 15,
							width: '48%',
							borderRadius: 12,
							textAlign: 'center'
						}}
					>
						Television
					</Text>
					<Text
						style={{
							borderWidth: 1,
							paddingVertical: 12,
							paddingHorizontal: 15,
							width: '48%',
							borderRadius: 12,
							textAlign: 'center'
						}}
					>
						Television
					</Text>
				</View>
				{/* <CategoryList title="seleceted Product" data={sampleData1} step={1} /> */}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({});
