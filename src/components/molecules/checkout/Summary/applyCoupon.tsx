import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import { CustomButtom } from 'components/atoms';
import { DefaultStyles, FontGilroy } from '@primitives/index';
import { useTheme } from '@hooks/index';

export default function ApplyCoupon({ setApplyModal }: any) {
	const { colors } = useTheme();

	const [coupon, setCoupon] = useState('');

	const closeApplyPage = () => {
		setApplyModal(false);
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerText}>Available Offers</Text>
				<TouchableOpacity onPress={closeApplyPage}>
					<Text>Close</Text>
				</TouchableOpacity>
			</View>
			<View style={[styles.inputContainer, { borderColor: colors.primary }]}>
				<TextInput
					maxLength={6}
					placeholder="Enter Coupon"
					style={styles.input}
					onChangeText={(text) => {
						setCoupon(text);
					}}
				/>
				<CustomButtom
					loading={false}
					onPress={() => {}}
					mode="text"
					text="Apply"
					disabled={coupon.length === 0}
					styles={[
						styles.checkButton,
						{
							backgroundColor: coupon.length === 0 ? colors.onSecondary : colors.primary,
							borderColor: colors.tertiary
						}
					]}
					textStyles={[
						styles.buttonText,
						{ color: coupon.length === 0 ? colors.tertiary : colors.onSecondary }
					]}
				/>
			</View>
			<Text style={styles.text}>Applicable Coupons</Text>

			<Text style={styles.boldText}>No applicable coupons available at the moment.</Text>

			<Text style={styles.text}>Non-Applicable Coupons</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 16,
		borderRadius: 8,
		marginBottom: 16
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	headerText: {
		fontSize: 16,
		fontWeight: 'bold'
	},
	inputContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderWidth: 1,
		borderRadius: 10,
		marginVertical: 15,
		paddingLeft: 10
	},
	input: {
		flex: 1,
		paddingVertical: 0
	},
	checkButton: {
		height: DefaultStyles.DefaultButtonHeight - 10,
		borderRadius: DefaultStyles.DefaultButtonHeight - 40,
		borderWidth: 1
	},
	buttonText: {
		fontFamily: FontGilroy.SemiBold,
		marginTop: 8,
		fontSize: 12
	},
	text: {
		marginVertical: 5,
		fontSize: 13,
		fontFamily: FontGilroy.Medium
	},
	boldText: {
		fontSize: 16,
		fontFamily: FontGilroy.SemiBold,
		marginVertical: 10
	}
});
