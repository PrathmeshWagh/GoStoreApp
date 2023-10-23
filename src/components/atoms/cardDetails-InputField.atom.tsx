import { Animated, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import AnimatedInputField from './AnimatedInputField';
import { CustomColors } from 'constants/colors.constants';
import { FontGilroy } from 'primitives';

type CardDetailsInputFieldProps = {
	value: string;
	onChangeText: (text: string) => void;
	error?: string;
};
const CardDetailsInputField: React.FC<CardDetailsInputFieldProps> = ({
	value,
	onChangeText,
	error
}) => {
	return (
		<View
			style={{
				flexDirection: 'row',
				borderWidth: 1,
				borderRadius: 10,
				borderColor: error !== '' ? 'red' : CustomColors.grey,
				marginVertical: 10
			}}
		>
			<AnimatedInputField
				showAnimatedLabel
				placeholder="Card Number"
				value={value}
				onChangeText={onChangeText}
				keyboardType="numeric"
				showErrorText={false}
				error={error !== '' ? error : ''}
				style={{
					flex: 1,
					borderWidth: 0,
					borderRadius: 0,
					paddingHorizontal: 10,
					borderColor: undefined
				}}
				placeholderStyle={{
					fontFamily: FontGilroy.Regular,
					fontSize: 13,
					color: error !== '' ? 'red' : CustomColors.cart
				}}
				textStyle={{
					fontFamily: FontGilroy.Regular,
					fontSize: 13,
					color: CustomColors.cart
				}}
				placeholderTextColor={CustomColors.cart}
				maxLength={15}
			/>
			<View
				style={{
					width: 1,
					backgroundColor: CustomColors.grey
				}}
			/>
			<Image
				style={{
					height: 35,
					width: 35,
					marginHorizontal: 15,
					alignSelf: 'center'
				}}
				resizeMode="contain"
				source={require('../../assets/images/card.png')}
			/>
		</View>
	);
};

export default CardDetailsInputField;

const styles = StyleSheet.create({});
