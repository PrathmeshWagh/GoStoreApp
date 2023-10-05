import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { CustomButtom } from 'components/atoms';
import { DefaultStyles, FontGilroy } from '@primitives/index';
import { useTheme } from '@hooks/index';
import { useCheckPincodeExchangeMutation } from 'api/Exchange/checkPincodeExchangeAvailability';
import ProductCategories from './product-categories';

export default function EXchangeDetails({ setIsExchangeVisible }: any) {
	const [isPicodeVisible, setIsPincodeVisible] = useState(true);
	const [pincode, setPincode] = useState('');
	const [isServicable, setIsServicable] = useState(false);
	const [servicableErrorMsg, setServicableErrorMsg] = useState(false);

	const { colors } = useTheme();

	const closeExchangePage = () => {
		setIsExchangeVisible(false);
	};

	const {
		mutate: checkPincode,
		isLoading: pincodeServiceabilityLoading,
		data: pincodeServiceabilityResponse,
		isError: pincodeServiceabilityError,
		error: pincodeServiceabilityErrorResponse
	} = useCheckPincodeExchangeMutation();

	const onCheckPincodeServiceabilityPress = () => {
		setServicableErrorMsg(false);
		checkPincode(pincode, {
			onSuccess: (res: any) => {
				if (res?.data?.status === 'success') {
					setIsServicable(res?.data?.serviceable);
					setServicableErrorMsg(!res?.data?.serviceable);
				} else {
					setIsServicable(false);
				}
			},
			onError: (err: any) => {
				console.log('error ms ', err);
				setIsServicable(false);
			}
		});
	};

	return (
		<ScrollView>
			<View style={styles.container}>
				{isPicodeVisible && (
					<>
						<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
							<Text style={{ fontSize: 18, fontWeight: 'bold' }}>Exchange your Product</Text>
							<TouchableOpacity
								onPress={() => {
									closeExchangePage();
								}}
							>
								<Text>Close</Text>
							</TouchableOpacity>
						</View>
						<Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 14 }}>
							Check availability for exchange
						</Text>
						<View
							style={{
								borderRadius: 8,
								overflow: 'hidden',
								marginTop: 12,
								flexDirection: 'row',
								alignItems: 'center'
							}}
						>
							<TextInput
								style={{
									fontSize: 16,
									borderBottomWidth: 1.5,
									borderColor: 'gray',
									flex: 1,
									marginRight: 12,
									padding: 10
								}}
								placeholder="Enter Pincode"
								keyboardType="numeric"
								value={pincode}
								maxLength={6}
								onChangeText={(text) => {
									if (text.length <= 6) {
										setPincode(text);
									}
								}}
							/>
							<CustomButtom
								loading={false}
								onPress={() => {
									onCheckPincodeServiceabilityPress();
								}}
								mode="text"
								text="Apply"
								disabled={pincode.length !== 6}
								styles={{
									height: DefaultStyles.DefaultButtonHeight,
									borderRadius: DefaultStyles.DefaultButtonHeight - 40,
									backgroundColor: pincode.length !== 6 ? colors.onSecondary : colors.primary,
									borderColor: colors.tertiary,
									borderWidth: 1
								}}
								textStyles={[
									styles.buttonText,
									{ color: pincode.length !== 6 ? colors.tertiary : colors.onSecondary }
								]}
							/>
						</View>
						<Text style={{ fontSize: 10, color: 'gray' }}>Exchange available in your area</Text>
						{servicableErrorMsg && (
							<Text style={{ color: '#DB2777', fontSize: 12 }}>
								Not serviceable in this location.
							</Text>
						)}
					</>
				)}

				{isServicable && (
					<ProductCategories
					// setIsPincodeVisible={setIsPincodeVisible}
					// setIsExchangeVisible={setIsExchangeVisible}
					// onAddToCart={onAddToCart}
					// storePrice={storePrice}
					/>
				)}
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 16,
		borderRadius: 8,
		marginBottom: 16
	},
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
