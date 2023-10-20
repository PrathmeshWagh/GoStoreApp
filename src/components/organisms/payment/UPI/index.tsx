import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { PAYMENT_OPTIONS } from 'helpers/constants/payments';
import GPay from '@assets/icons/payments/upi/gpay.svg';
import PhonePay from '@assets/icons/payments/upi/phonepay.svg';
import Paytm from '@assets/icons/payments/upi/paytm.svg';
import { useEnhancedNavigation } from 'hooks';
import { RouteConstants } from 'routes/constants.routes';
import { CustomColors } from 'constants/colors.constants';

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
		<View style={{ marginTop: 20 }}>
			<Text style={{ color: CustomColors.cart, marginBottom: 20 }}>
				{PAYMENT_OPTIONS.UPI_APPS.label}
			</Text>
			<View style={styles.upiAppBox}>
				{PAYMENT_OPTIONS.UPI_APPS.options.map((upiapp) => (
					<TouchableOpacity
						key={upiapp.label}
						onPress={upiAppHandler}
						style={{ alignItems: 'center' }}
					>
						{paymentMethodIcons[upiapp.id]}
						<Text style={{ marginTop: 5, fontSize: 12, color: CustomColors.cart }}>
							{upiapp.label}
						</Text>
					</TouchableOpacity>
				))}
				<View style={{ alignItems: 'center' }}>
					<TouchableOpacity style={{ width: 24, height: 24, borderWidth: 1, borderRadius: 7 }}>
						<Text style={{ textAlign: 'center' }}>+</Text>
					</TouchableOpacity>
					<Text style={{ marginTop: 5, fontSize: 12, color: CustomColors.cart }}>Add New</Text>
				</View>
			</View>
		</View>
	);
};

export default UPI;
const styles = StyleSheet.create({
	upiAppBox: {
		flexDirection: 'row',
		justifyContent: 'space-around'
	}
});
