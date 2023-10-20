import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { CustomButtom } from 'components/atoms';
import { useTheme, useDimensions, usePermissionHandlers } from '@hooks/index';
import { DefaultStyles, FontGilroy } from '@primitives/index';

export default function EmptyCart() {
	const { width, height } = useDimensions();
	const { colors } = useTheme();
	return (
		<View>
			<Text>Your cart is Empty</Text>
			<Text>
				Looks like you have not added anything to your cart. Go ahead & explore our top categories.
			</Text>
			<Image source={require('@assets/images/empty_cart.png')} width={width} height={300} />
			<CustomButtom
				text="Shop our Product"
				loading={false}
				onPress={() => {}}
				mode="text"
				disabled={false}
				styles={{
					height: DefaultStyles.DefaultButtonHeight - 8,
					borderRadius: DefaultStyles.DefaultButtonHeight - 40,
					borderColor: colors.primary
				}}
				textStyles={[styles.buttonText, { color: colors.onSecondary }]}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	buttonText: {
		fontFamily: FontGilroy.Medium,
		marginTop: 8,
		fontSize: 12,
		letterSpacing: 0.5
	}
});
