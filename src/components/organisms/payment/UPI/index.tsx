import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { PAYMENT_OPTIONS } from 'helpers/constants/payments';
import GPay from '@assets/icons/payments/upi/gpay.svg';
import PhonePay from '@assets/icons/payments/upi/phonepay.svg';
import Paytm from '@assets/icons/payments/upi/paytm.svg';
import { useEnhancedNavigation } from 'hooks';
import { RouteConstants } from 'routes/constants.routes';

const UPI = () => {
	const { navigate } = useEnhancedNavigation();
	const paymentMethodIcons = {
		GPAY: <GPay width={24} height={24} />,
		PHONEPAY: <PhonePay width={24} height={24} />,
		PAYTM: <Paytm width={24} height={24} />
	};

	const upiAppHandler = () => {
		navigate(RouteConstants.UPIDetailsScreenRoute);
	};

	return (
		<View>
			<Text>{PAYMENT_OPTIONS.UPI_APPS.label}</Text>
			{PAYMENT_OPTIONS.UPI_APPS.options.map((upiapp) => (
				<TouchableOpacity key={upiapp.label} style={styles.upiAppBox} onPress={upiAppHandler}>
					{paymentMethodIcons[upiapp.id]}
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
