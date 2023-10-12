import { useState, useEffect } from 'react';
import { View, Pressable, StyleSheet, Text, TextInput, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CustomColors } from 'constants/colors.constants';
import { FontGilroy } from 'primitives';
import CheckBox from 'react-native-check-box';

const BrandFilter = (data: any) => {
	const [expanded, setExpanded] = useState(true);
	const [isCheckedArray, setIsCheckedArray] = useState(data.data?.map(() => false));

	const togglerBrandDetails = () => {
		setExpanded(!expanded);
	};

	const handleCheckBoxClick = (index: number) => {
		const newIsCheckedArray = [...isCheckedArray];

		newIsCheckedArray[index] = !newIsCheckedArray[index];

		setIsCheckedArray(newIsCheckedArray);
	};

	return (
		<View>
			<Pressable style={[styles.filterinfo]} onPress={togglerBrandDetails}>
				<Text style={[styles.optionText]}>Brands</Text>
				<Icon name={expanded ? 'chevron-up' : 'chevron-down'} size={25} />
			</Pressable>
			{expanded && (
				<View>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center'
						}}
					>
						<TextInput placeholder="Search Brands" style={styles.textinput} />
						<MaterialCommunityIcons name="magnify" size={30} color={CustomColors.primary} />
					</View>
					<ScrollView style={{ marginTop: 10 }}>
						{data.data?.map((brand: string, index: number) => (
							<View key={index}>
								<CheckBox
									style={{ paddingTop: 10 }}
									onClick={() => handleCheckBoxClick(index)}
									isChecked={isCheckedArray[index]}
									rightText={brand}
									rightTextStyle={styles.brandText}
									checkedCheckBoxColor={CustomColors.primary}
									uncheckedCheckBoxColor={CustomColors.grey}
								/>
							</View>
						))}
					</ScrollView>
				</View>
			)}
		</View>
	);
};

export default BrandFilter;
const styles = StyleSheet.create({
	filterinfo: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 10
	},
	optionText: {
		alignItems: 'center',
		justifyContent: 'center',
		fontSize: 15,
		color: CustomColors.secondary,
		paddingLeft: 5,
		fontFamily: FontGilroy.Medium
	},
	textinput: {
		paddingLeft: 10,
		color: CustomColors.secondary,
		borderBottomWidth: 0.5,
		borderBottomColor: CustomColors.textGrey1,
		width: '80%'
	},
	brandText: {
		color: CustomColors.secondary,
		fontSize: 12,
		fontFamily: FontGilroy.Medium
	}
});
