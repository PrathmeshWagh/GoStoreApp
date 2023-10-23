import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { CustomButtom } from 'components/atoms';

const PayOnDelivery = () => {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center'
			}}
		>
			<Text>Are you sure you want to place order?</Text>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-around',
					alignItems: 'center'
				}}
			>
				<CustomButtom disabled={false} loading={false} onPress={() => {}} text="Yes" />
				<CustomButtom disabled={false} loading={false} onPress={() => {}} text="No" />
			</View>
		</View>
	);
};

export default PayOnDelivery;

const styles = StyleSheet.create({});
