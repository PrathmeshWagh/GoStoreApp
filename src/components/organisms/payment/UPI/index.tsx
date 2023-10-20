import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { PAYMENT_OPTIONS } from 'helpers/constants/payments';

const UPI = () => {
	return (
		<View>
			<Text>{PAYMENT_OPTIONS.UPI_APPS.label}</Text>
			{PAYMENT_OPTIONS.UPI_APPS.options.map((upiapp) => (
				<TouchableOpacity key={upiapp.label} style={styles.upiAppBox}>
					<Text>{upiapp.label}</Text>
				</TouchableOpacity>
			))}
			<TouchableOpacity></TouchableOpacity>
		</View>
	);
};

export default UPI;
const styles = StyleSheet.create({
	upiAppBox: {
		flexDirection: 'row',
		justifyContent: 'space-evenly'
	}
});
