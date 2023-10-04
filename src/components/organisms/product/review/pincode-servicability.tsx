import { StyleSheet, Text, View, TextInput } from 'react-native';
import React, { useState } from 'react';
import { DefaultStyles, FontGilroy } from '@primitives/index';
import { useTheme } from '@hooks/index';
import { CustomButtom, ProductSlider, Rupee } from 'components/atoms';
import { useCheckPincodeServiceabilityMutation } from 'api/checkout/check-pincode-serviceability';

export default function PincodeServicality() {
	const { colors } = useTheme();
	const [pincode, setPincode] = useState<string>('');
	const [isPincodeMsgVisible, setIsPicodeMsgVisible] = useState(false);

	const {
		mutate: checkPincodeServiceability,
		isLoading: pincodeServiceabilityLoading,
		data: pincodeServiceabilityResponse,
		isError: pincodeServiceabilityError,
		error: pincodeServiceabilityErrorResponse
	} = useCheckPincodeServiceabilityMutation();

	const renderServiceabilityCheckFeedback = () => {
		if (!pincodeServiceabilityResponse && !pincodeServiceabilityError) {
			return null;
		}

		let textStyle = { color: 'red' };
		let message = 'Sorry, this product is not available in this pincode';

		if (pincodeServiceabilityError) {
			message = 'Serviceability check failed, please try again';
		}

		if (pincodeServiceabilityResponse?.data?.serviceability) {
			textStyle = { color: 'green' };
			message = 'Product is available in this pincode';
		}

		return <Text style={[styles.feedbackText, textStyle]}>{message}</Text>;
	};

	const onCheckPincodeServiceabilityPress = () => {
		renderServiceabilityCheckFeedback();
		setIsPicodeMsgVisible(true);
		checkPincodeServiceability({
			productId: '6360eec564cb95ecdd4b7a99',
			pincode
		});
	};

	return (
		<View>
			<Text style={{ fontFamily: FontGilroy.SemiBold, fontSize: 17 }}>Deliver To</Text>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
					borderWidth: 1,
					borderColor: colors.primary,
					borderRadius: 10,
					marginVertical: 15
				}}
			>
				<TextInput
					maxLength={6}
					placeholder="Enter PIN code"
					keyboardType="numeric"
					style={{ flex: 1 }}
					onChangeText={(text) => {
						setIsPicodeMsgVisible(false);
						setPincode(text);
					}}
				/>
				<CustomButtom
					loading={false}
					onPress={() => {
						onCheckPincodeServiceabilityPress();
					}}
					mode="text"
					text="Check"
					disabled={pincode.length !== 6}
					styles={{
						height: DefaultStyles.DefaultButtonHeight,
						borderRadius: DefaultStyles.DefaultButtonHeight - 40,
						backgroundColor: pincode.length !== 6 ? 'white' : colors.primary,
						borderColor: colors.tertiary,
						borderWidth: 1
					}}
					textStyles={[
						styles.buttonText,
						{ color: pincode.length !== 6 ? colors.tertiary : colors.onSecondary } // Conditionally set text color
					]}
				/>
			</View>
			{isPincodeMsgVisible && renderServiceabilityCheckFeedback()}
		</View>
	);
}

const styles = StyleSheet.create({
	buttonText: {
		fontFamily: FontGilroy.SemiBold,
		marginTop: 8
	},
	feedbackText: {
		fontFamily: FontGilroy.Medium,
		fontSize: 12,
		marginBottom: 10
	}
});
