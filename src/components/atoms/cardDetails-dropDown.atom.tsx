import {
	FlatList,
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from 'react-native';
import React, { useState } from 'react';
import { FontGilroy } from 'primitives';
import { CustomColors } from 'constants/colors.constants';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';

type CardDetailsDropDownProps = {
	items: any;
	placeholder: string;
	value: string | undefined;
	onSelect: React.Dispatch<React.SetStateAction<string | undefined>>;
	error?: string;
};

const CardDetailsDropDown: React.FC<CardDetailsDropDownProps> = ({
	items,
	placeholder,
	value,
	onSelect,
	error
}) => {
	const [listVisible, setListVisible] = useState(false);

	const onPressItem = (item: any) => {
		onSelect(item.label);
	};
	console.log('🚀 ~ file: cardDetails-dropDown.atom.tsx:42 ~ error:', error);

	return (
		<View
			style={{
				borderRadius: 10,
				borderWidth: 1,
				borderColor: !error ? CustomColors.grey : 'red',
				paddingVertical: listVisible || value ? 3 : 9,
				paddingHorizontal: 10,
				height: 45,
				marginBottom: 5
			}}
		>
			<Menu
				onOpen={() => {
					setListVisible(true);
				}}
				onClose={() => {
					setListVisible(false);
				}}
			>
				{listVisible || value !== '' ? (
					<Text
						style={{
							fontFamily: FontGilroy.Regular,
							fontSize: 12,
							color: error !== '' ? 'red' : CustomColors.cart
						}}
					>
						{placeholder}
					</Text>
				) : null}
				<MenuTrigger
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between',
						marginTop: 5
					}}
				>
					<Text
						style={{
							fontFamily: FontGilroy.Regular,
							fontSize: 13,
							color: CustomColors.cart
						}}
					>
						{value !== '' ? value : placeholder}
					</Text>
					<Image
						source={require('../../assets/images/downArrow.png')}
						style={{
							height: 10,
							width: 10,
							tintColor: CustomColors.grey
						}}
						resizeMode="contain"
					/>
				</MenuTrigger>
				<MenuOptions
					optionsContainerStyle={{
						height: 200,
						width: '27%',
						marginLeft: -10,
						marginTop: 40
					}}
				>
					<ScrollView showsVerticalScrollIndicator={false}>
						{items.map((item) => {
							return (
								<MenuOption
									style={{
										alignItems: 'center',
										marginVertical: 5
									}}
									onSelect={() => onPressItem(item)}
								>
									<Text
										style={{
											fontFamily: FontGilroy.Regular,
											fontSize: 13,
											color: CustomColors.cart
										}}
									>
										{item.value}
									</Text>
								</MenuOption>
							);
						})}
					</ScrollView>
				</MenuOptions>
			</Menu>
		</View>
	);
};

export default CardDetailsDropDown;

const styles = StyleSheet.create({});
