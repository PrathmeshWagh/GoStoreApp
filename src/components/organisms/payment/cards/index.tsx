import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { DefaultStyles, FontGilroy } from 'primitives';
import Divider from 'components/atoms/divider.atom';
import { CustomColors } from 'constants/colors.constants';
import { useEnhancedNavigation } from 'hooks';
import { RouteConstants } from 'routes/constants.routes';

const Cards = () => {
	const { navigate } = useEnhancedNavigation();

	const onPressCreditCard = () => {
		navigate(RouteConstants.CardDetailsScreenRoute, { type: 'Credit Card' });
	};

	const onPressDebitCard = () => {
		navigate(RouteConstants.CardDetailsScreenRoute, { type: 'Debit Card' });
	};

	return (
		<View>
			<Text style={{ marginTop: 20, marginBottom: 10, color: CustomColors.cart }}>Cards</Text>
			<View style={styles.cardsbox}>
				<TouchableOpacity
					onPress={onPressCreditCard}
					style={{ flexDirection: 'row', justifyContent: 'space-between' }}
				>
					<View style={{ flexDirection: 'row' }}>
						<View style={{ paddingRight: 16 }}>
							<Text>?</Text>
						</View>
						<View>
							<Text style={{ color: CustomColors.cart, fontWeight: 'bold' }}>Credit Card</Text>
							<Text style={{ fontSize: 8, color: CustomColors.cart }}>Pay Using Credit Card</Text>
						</View>
					</View>
					<Text>X</Text>
				</TouchableOpacity>

				<Divider type="double" style={{ marginVertical: 10 }} />
				<TouchableOpacity
					onPress={onPressDebitCard}
					style={{ flexDirection: 'row', justifyContent: 'space-between' }}
				>
					<View style={{ flexDirection: 'row' }}>
						<View style={{ paddingRight: 16 }}>
							<Text>?</Text>
						</View>
						<View>
							<Text style={{ color: CustomColors.cart, fontWeight: 'bold' }}>Debit Card</Text>
							<Text style={{ fontSize: 8, color: CustomColors.cart }}>Pay Using Debit Card</Text>
						</View>
					</View>
					<Text>X</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default Cards;
const styles = StyleSheet.create({
	cardsbox: {
		borderWidth: 0.5,
		borderRadius: 10,
		padding: DefaultStyles.DefaultPadding,
		borderColor: CustomColors.cart
	}
});
