import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useEnhancedNavigation } from 'hooks';
import { RouteConstants } from 'routes/constants.routes';
import { CustomColors } from 'constants/colors.constants';
import { Rupee } from 'components/atoms';
import { FontGilroy } from 'primitives';

const Summary = () => {
	const { navigate } = useEnhancedNavigation();

	const viewDetailsHandler = () => {
		navigate(RouteConstants.CartScreenRoute);
	};

	return (
		<View style={styles.container}>
			<View style={styles.priceText}>
				<Text style={{ fontSize: 13 }}>Total Payable Amount</Text>
				<Rupee money={31497} styles={styles.mrp} />
			</View>

			<TouchableOpacity onPress={viewDetailsHandler}>
				<Text style={{ color: CustomColors.primary, fontSize: 12 }}>View Details</Text>
			</TouchableOpacity>
		</View>
	);
};

export default Summary;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: '10%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: CustomColors.grey
	},
	priceText: {
		flexDirection: 'row'
	},
	mrp: {
		color: CustomColors.cart,
		fontFamily: FontGilroy.Medium
	}
});
