import { View, Text, StyleSheet, Linking, Pressable } from 'react-native';
import React from 'react';
import Layout from 'components/molecules/layout/layout.molecule';
import { DefaultStyles, FontGilroy } from 'primitives';
import { CustomColors } from 'constants/colors.constants';

const layout = {
	menu: true,
	search: true,
	back: false,
	logo: 'https://gostor.com/icons/header/logo-invert.svg',
	cart: true,
	pincode: true
};

const CustomerSupportScreen = () => {
	const phoneNumber = '08068001177';
	const email = 'customersupport@gostor.com';

	const callPhoneNumber = () => {
		Linking.openURL(`tel:${phoneNumber}`);
	};

	const emailHandler = () => {
		Linking.openURL(`mailto:${email}`);
	};
	return (
		<Layout layout={layout}>
			<View style={styles.innerContainer}>
				<Text style={styles.headerText}>Customer Support</Text>
				<Text style={styles.text1}>
					Leave your feedback or connect with us to get timely resolution and updates on any product
					or order related query through the following channels:
				</Text>
				<View style={{ flexDirection: 'row', paddingBottom: DefaultStyles.DefaultPadding - 5 }}>
					<Text style={{ fontSize: 13, color: CustomColors.secondary }}>Call: </Text>
					<Pressable onPress={callPhoneNumber}>
						<Text style={styles.phoneNumberText}>{phoneNumber}</Text>
					</Pressable>
					<Text style={{ fontSize: 13, color: CustomColors.secondary }}> (9AM - 9 PM)</Text>
				</View>

				<View style={{ flexDirection: 'row' }}>
					<Text style={{ fontSize: 13, color: CustomColors.secondary }}>Email:</Text>
					<Pressable onPress={emailHandler}>
						<Text style={{ color: CustomColors.primary }}> {email}</Text>
					</Pressable>
				</View>
			</View>
		</Layout>
	);
};

export default CustomerSupportScreen;
const styles = StyleSheet.create({
	innerContainer: {
		padding: DefaultStyles.DefaultPadding
	},
	headerText: {
		color: CustomColors.secondary,
		fontSize: 20,
		fontFamily: FontGilroy.SemiBold
	},
	text1: {
		lineHeight: 20,
		marginVertical: 10,
		fontSize: 12,
		color: CustomColors.secondary
	},
	phoneNumberText: {
		fontSize: 13,
		color: CustomColors.primary
	}
});
