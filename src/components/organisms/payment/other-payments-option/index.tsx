import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { DefaultStyles, FontGilroy } from 'primitives';
import Divider from 'components/atoms/divider.atom';
import { CustomColors } from 'constants/colors.constants';

const OtherPayOption = () => {
	return (
		<View>
			<Text style={{ marginTop: 20, marginBottom: 10, color: CustomColors.cart }}>
				Other Payment Option
			</Text>
			<View style={styles.cardsbox}>
				<TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
					<View style={{ flexDirection: 'row' }}>
						<View style={{ paddingRight: 16 }}>
							<Text>?</Text>
						</View>
						<View>
							<Text style={{ color: CustomColors.cart, fontWeight: 'bold' }}>EMI</Text>
							<Text style={{ fontSize: 8, color: CustomColors.cart }}>
								Select From A List Of EMI provider
							</Text>
						</View>
					</View>
					<Text>X</Text>
				</TouchableOpacity>
				<Divider type="double" style={{ marginVertical: 10 }} />

				<TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
					<View style={{ flexDirection: 'row' }}>
						<View style={{ paddingRight: 16 }}>
							<Text>?</Text>
						</View>
						<View>
							<Text style={{ color: CustomColors.cart, fontWeight: 'bold' }}>Pay on delivery</Text>
							<Text style={{ fontSize: 8, color: CustomColors.cart }}>
								Pay in cash or pay online
							</Text>
						</View>
					</View>
					<Text>X</Text>
				</TouchableOpacity>
				<Divider type="double" style={{ marginVertical: 10 }} />

				<TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
					<View style={{ flexDirection: 'row' }}>
						<View style={{ paddingRight: 16 }}>
							<Text>?</Text>
						</View>
						<View>
							<Text style={{ color: CustomColors.cart, fontWeight: 'bold' }}>Net baning</Text>
							<Text style={{ fontSize: 8, color: CustomColors.cart }}>
								Select from a list of banks
							</Text>
						</View>
					</View>
					<Text>X</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default OtherPayOption;
const styles = StyleSheet.create({
	cardsbox: {
		borderWidth: 0.5,
		borderRadius: 10,
		padding: DefaultStyles.DefaultPadding,
		borderColor: CustomColors.cart
	}
});
