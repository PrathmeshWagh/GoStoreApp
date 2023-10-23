import {
	FlatList,
	Image,
	LayoutAnimation,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { CustomColors } from 'constants/colors.constants';
import { DefaultStyles, FontGilroy } from 'primitives';
import { CustomButtom } from 'components/atoms';
import { useIsFocused } from '@react-navigation/native';

type EMIDetailsType = {
	id: number;
	name: string;
	details?: IntrestDetailsType[];
	banks?: BanksListType[];
};

type IntrestDetailsType = {
	id: number;
	ammount: string;
	duration: string;
	intrest: string;
};

type BanksListType = {
	id: number;
	name: string;
	details?: IntrestDetailsType[];
};

const EMIDetails = () => {
	const EMIBankList: EMIDetailsType[] = [
		{
			id: 1,
			name: 'BAJAJ',
			details: [
				{
					id: 1,
					ammount: '6,449',
					duration: '3 months',
					intrest: '0%'
				},
				{
					id: 2,
					ammount: '6,449',
					duration: '3 months',
					intrest: '0%'
				},
				{
					id: 3,
					ammount: '6,449',
					duration: '3 months',
					intrest: '0%'
				},
				{
					id: 4,
					ammount: '6,449',
					duration: '3 months',
					intrest: '0%'
				}
			]
		},
		{
			id: 2,
			name: 'AXIO'
		},
		{
			id: 3,
			name: 'Credit Card EMI',
			banks: [
				{
					id: 1,
					name: 'BANK OF BARODA',
					details: [
						{
							id: 1,
							ammount: '6,449',
							duration: '3 months',
							intrest: '0%'
						},
						{
							id: 2,
							ammount: '6,449',
							duration: '3 months',
							intrest: '0%'
						},
						{
							id: 3,
							ammount: '6,449',
							duration: '3 months',
							intrest: '0%'
						},
						{
							id: 4,
							ammount: '6,449',
							duration: '3 months',
							intrest: '0%'
						}
					]
				},
				{
					id: 2,
					name: 'BANK OF BARODA 2',
					details: [
						{
							id: 1,
							ammount: '6,449',
							duration: '3 months',
							intrest: '0%'
						},
						{
							id: 2,
							ammount: '6,449',
							duration: '3 months',
							intrest: '0%'
						},
						{
							id: 3,
							ammount: '6,449',
							duration: '3 months',
							intrest: '0%'
						},
						{
							id: 4,
							ammount: '6,449',
							duration: '3 months',
							intrest: '0%'
						}
					]
				}
			]
		}
	];

	const focus = useIsFocused();

	const [selectedItem, setSelectedItem] = useState<{
		id: number | null;
		bankId: number | null;
		details: number | null;
	}>({
		id: null,
		bankId: null,
		details: null
	});
	const [dropDownVisible, setDropDownVisible] = useState<number | null>(null);
	const [bankListViewVisible, setBankListViewVisible] = useState<{
		visible: boolean;
		id: number | null;
	}>({
		visible: false,
		id: null
	});

	const onPressDropDown = (id: number) => {
		setDropDownVisible(id);
	};

	const renderItem = ({ item, index }: { item: EMIDetailsType; index: number }) => {
		return (
			<>
				<TouchableOpacity
					onPress={() => {
						if (item.name == 'Credit Card EMI') {
							setBankListViewVisible({
								id: item.id,
								visible: true
							});
						} else {
							onPressDropDown(item.id);
						}
						focus ? LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut) : null;
					}}
					activeOpacity={1}
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center'
					}}
				>
					<View
						style={{
							flexDirection: 'row'
						}}
					>
						<Text>?</Text>
						<Text
							style={{
								fontFamily: FontGilroy.SemiBold,
								fontSize: 15,
								color: CustomColors.cardTitleTxt,
								marginHorizontal: 20,
								fontWeight: '600'
							}}
						>
							{item.name}
						</Text>
					</View>
					<Image
						source={require('../../../../assets/images/downArrow.png')}
						style={{
							height: 10,
							width: 10,
							tintColor: CustomColors.grey,
							transform: [{ rotate: '270deg' }]
						}}
					/>
				</TouchableOpacity>
				{item?.details && dropDownVisible == item.id ? (
					<FlatList scrollEnabled={false} data={item.details} renderItem={renderDetails} />
				) : null}
				{dropDownVisible == item.id && !item?.details ? (
					<CustomButtom
						styles={{
							marginTop: 10
						}}
						disabled={false}
						loading={false}
						onPress={() => {}}
						text="Pay now"
					/>
				) : null}
			</>
		);
	};

	const renderDetails = ({ item, index }: { item: IntrestDetailsType; index: number }) => {
		const commonCondition = selectedItem.id == dropDownVisible && selectedItem.details == item.id;
		const checkBankCondition =
			bankListViewVisible.id && bankListViewVisible.visible
				? bankListViewVisible.id == selectedItem.bankId && commonCondition
				: commonCondition;
		return (
			<TouchableOpacity
				onPress={() => {
					setSelectedItem({
						bankId: bankListViewVisible.id ?? null,
						details: item.id,
						id: dropDownVisible
					});
				}}
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					borderWidth: 0.5,
					borderColor: CustomColors.grey,
					borderRadius: 10,
					padding: 10,
					marginTop: 15
				}}
			>
				{checkBankCondition ? (
					<View
						style={{
							borderWidth: 2,
							borderColor: 'green',
							borderRadius: 15,
							height: 18,
							width: 18,
							backgroundColor: undefined,
							padding: 1,
							alignItems: 'center',
							justifyContent: 'center'
						}}
					>
						<View
							style={{
								backgroundColor: 'green',
								borderRadius: 10,
								width: '75%',
								height: '75%'
							}}
						/>
					</View>
				) : (
					<View
						style={{
							height: 18,
							width: 18,
							backgroundColor: undefined,
							borderRadius: 10,
							borderWidth: 2
						}}
					/>
				)}

				<Text
					style={{
						fontFamily: FontGilroy.Bold,
						fontSize: 13,
						color: CustomColors.cart,
						marginHorizontal: 5
					}}
				>{`₹${item.ammount} for ${item.duration} @ ${item.intrest}`}</Text>
			</TouchableOpacity>
		);
	};

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: CustomColors.white,
				paddingHorizontal: DefaultStyles.DefaultPadding,
				paddingVertical: 10
			}}
		>
			{bankListViewVisible ? (
				<TouchableOpacity
					onPress={() => {
						setBankListViewVisible(false);
						setDropDownVisible(null);
					}}
					style={{
						flexDirection: 'row',
						marginVertical: 10
					}}
				>
					<Text>?</Text>
					<Text
						style={{
							marginHorizontal: 10,
							fontFamily: FontGilroy.SemiBold,
							fontSize: 15,
							color: CustomColors.cardTitleTxt,
							fontWeight: '400'
						}}
					>
						Credit Card EMI
					</Text>
				</TouchableOpacity>
			) : null}
			<View
				style={{
					backgroundColor: CustomColors.white,
					borderWidth: 1,
					borderRadius: 15,
					padding: 10,
					paddingVertical: 15,
					borderColor: CustomColors.grey
				}}
			>
				{!bankListViewVisible.visible && !bankListViewVisible.id && (
					<FlatList
						data={EMIBankList}
						renderItem={renderItem}
						bounces={false}
						ItemSeparatorComponent={() => {
							return (
								<View
									style={{
										height: 0.5,
										backgroundColor: CustomColors.grey,
										marginVertical: 10
									}}
								/>
							);
						}}
					/>
				)}
				{bankListViewVisible.visible && bankListViewVisible.id && (
					<FlatList
						data={EMIBankList.filter((item) => item.id == bankListViewVisible.id)[0]?.banks}
						renderItem={renderItem}
						bounces={false}
						ItemSeparatorComponent={() => {
							return (
								<View
									style={{
										height: 0.5,
										backgroundColor: CustomColors.grey,
										marginVertical: 10
									}}
								/>
							);
						}}
					/>
				)}
				{/* <FlatList
					bounces={false}
					ItemSeparatorComponent={() => {
						return (
							<View
								style={{
									height: 0.5,
									backgroundColor: CustomColors.grey,
									marginVertical: 10
								}}
							/>
						);
					}}
					data={
						bankListViewVisible
							? EMIBankList.filter((item) => item.id == dropDownVisible)[0].banks
							: EMIBankList
					}
					renderItem={renderItem}
				/> */}
			</View>
		</View>
	);
};

export default EMIDetails;

const styles = StyleSheet.create({});
