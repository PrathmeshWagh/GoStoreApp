import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Summary from './summary';
import OfferSection from './offers-section';
import { DefaultStyles } from 'primitives';
import UPI from './UPI';
import Cards from './cards';

const Payment = () => {
	return (
		<View>
			<Summary />
			<View style={styles.container}>
				<OfferSection />
				<UPI />
				<Cards />
			</View>
		</View>
	);
};

export default Payment;
const styles = StyleSheet.create({
	container: {
		paddingHorizontal: DefaultStyles.DefaultPadding
	}
});
