import { useState, useEffect } from 'react';
import { View, Pressable, StyleSheet, Text, TextInput, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CustomColors } from 'constants/colors.constants';
import { DefaultStyles, FontGilroy } from 'primitives';
import CheckBox from 'react-native-check-box';

const BrandFilter = (data: any, { onSelectedBrand }) => {
	const [expanded, setExpanded] = useState(true);
	const [filterData, setFilterData] = useState([]);
	const [isCheckedArray, setIsCheckedArray] = useState(filterData?.map(() => false));
	const [search, setSearch] = useState('');
	const [oldData, setOldData] = useState([]);

	useEffect(() => {
		if (data?.data) {
			setFilterData(data?.data);
			setOldData(data?.data);
		}
	}, []);

	const togglerBrandDetails = () => {
		setExpanded(!expanded);
	};

	const handleCheckBoxClick = (index: number, brand: string) => {
		// onSelectedBrand(brand);
		const newIsCheckedArray = [...isCheckedArray];

		newIsCheckedArray[index] = !newIsCheckedArray[index];

		setIsCheckedArray(newIsCheckedArray);
	};

	const onSearch = (text: string) => {
		if (text == '') {
			setFilterData(oldData);
		} else {
			let tempList = filterData?.filter((item) => {
				return item.toLowerCase().indexOf(text.toLowerCase()) > -1;
			});

			setFilterData(tempList);
		}
	};

	return (
		<View>
			<Pressable style={[styles.filterinfo]} onPress={togglerBrandDetails}>
				<Text
					style={[
						styles.optionText,
						isCheckedArray.some((isChecked: boolean) => isChecked) ? styles.selectedValueText : null
					]}
				>
					Brands
				</Text>
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
						<TextInput
							placeholder="Search Brands"
							style={styles.textinput}
							value={search}
							onChangeText={(text) => {
								onSearch(text);
								setSearch(text);
							}}
						/>

						<MaterialCommunityIcons name="magnify" size={30} color={CustomColors.primary} />
					</View>
					{filterData?.length < 1 ? (
						<View
							style={{
								height: DefaultStyles.DefaultHeight,
								flex: 1,
								justifyContent: 'center',
								alignItems: 'center'
							}}
						>
							<Text style={{ textAlign: 'center', color: CustomColors.secondary }}>
								No Brands Found
							</Text>
						</View>
					) : (
						<ScrollView style={{ marginTop: 10 }}>
							{filterData?.map((brand: string, index: number) => (
								<View key={index}>
									<CheckBox
										style={{ paddingTop: 10 }}
										onClick={() => handleCheckBoxClick(index, brand)}
										isChecked={isCheckedArray[index]}
										rightText={brand}
										rightTextStyle={styles.brandText}
										checkedCheckBoxColor={CustomColors.primary}
										uncheckedCheckBoxColor={CustomColors.grey}
									/>
								</View>
							))}
						</ScrollView>
					)}
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
	},
	selectedValueText: {
		fontFamily: FontGilroy.SemiBold
	}
});
