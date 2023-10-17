import { Pressable, ScrollView, StyleSheet, Text, View, Modal } from 'react-native';
import React, { useEffect, useState } from 'react';
import { CustomButtom, ProductSlider, Rupee } from 'components/atoms';
import { useTheme, useDimensions, usePermissionHandlers } from '@hooks/index';
import { DefaultStyles, FontGilroy } from '@primitives/index';
import { useEnhancedNavigation } from '@hooks/index';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BasicCard from '@atoms/basic-card.atom';
import OrderSummary from 'components/molecules/orders/order-summary';
import InformationIcon from '@assets/icons/information-icon.svg';
import TrashIcon from '@assets/icons/trash.svg';
import ProductList from 'components/molecules/checkout/Summary/productList';
import { useGetPincodeMutation } from 'api/locate-user/get-pincode';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ApplyCoupon from 'components/molecules/checkout/Summary/applyCoupon';
import { useAddressMutation } from 'api/checkout/use-address';
import { useCheckoutSummaryMutation } from 'api/checkout/use-summary';
import { useSelector } from 'react-redux';
import { RootState } from '@slices/store';

export default function Cart() {
	const location = useSelector((state: RootState) => state.location);
	const { navigate } = useEnhancedNavigation();
	const { width, height } = useDimensions();
	const { colors } = useTheme();
	const [applyModal, setApplyModal] = useState<boolean>(false);

	let isLogin = false;
	let pincode: 395006;
	const {
		mutate: getPinCodeDetails,
		isLoading: isPincodeDetailsLoading,
		data: pincodeResponse,
		error: pincodeError
	} = useGetPincodeMutation();

	const { mutate: getAddresses, data, isLoading: addressLoader } = useAddressMutation();

	const { mutate: getCheckoutSummary } = useCheckoutSummaryMutation();

	useEffect(() => {
		getPinCodeDetails(pincode);
	}, []);

	useEffect(() => {
		const requestData = {
			cta: 'CART',
			pincode,
			state: location.state,
			useWallet: false,
			isKiosk: false
		};
		getAddresses();
		getCheckoutSummary(requestData);
	}, []);

	return (
		<View style={styles.container}>
			<ScrollView>
				<View style={styles.cartContainer}>
					<Text style={{ fontSize: 17, fontFamily: FontGilroy.Medium }}>Delivery To</Text>
					<View style={{ marginVertical: 15 }}>
						{isLogin ? (
							<BasicCard>
								<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
									<Text style={styles.text}>Name</Text>
									<Text style={[styles.text, { color: colors.primary }]}>Change</Text>
								</View>
								<View style={{ marginVertical: 5 }}>
									<Text style={[styles.text, { fontSize: 13 }]}>
										vatsal farm house surat vesu olpad ,baglore , bengaluru , karanataka -560004
									</Text>
								</View>
								<View style={{ flexDirection: 'row', alignItems: 'center' }}>
									<Text> icon</Text>
									<Text style={[styles.text, { fontSize: 13, marginLeft: 5 }]}>9510056175</Text>
								</View>
							</BasicCard>
						) : (
							<CustomButtom
								loading={false}
								onPress={() => {
									console.log('press');
								}}
								mode="outlined"
								text="Please Login to add address"
								disabled={false}
								styles={{
									height: DefaultStyles.DefaultButtonHeight - 10,
									borderRadius: DefaultStyles.DefaultButtonHeight - 40,
									borderColor: colors.primary
								}}
								textStyles={[styles.buttonText, { color: colors.primary }]}
							/>
						)}
					</View>
					<ProductList />
					<TouchableOpacity
						onPress={() => {
							setApplyModal(true);
						}}
						style={{ marginTop: 15, marginBottom: 25 }}
					>
						<BasicCard style={{ paddingVertical: 8 }}>
							<View style={styles.couponContainer}>
								<View style={{ flexDirection: 'row', alignItems: 'center' }}>
									<Text>Icon</Text>

									<Text style={[styles.text, { fontSize: 15, marginLeft: 8 }]}>Apply Coupon</Text>
								</View>
								<Icon name={'chevron-right'} size={20} color={colors.secondary} />
							</View>
						</BasicCard>
					</TouchableOpacity>

					<Modal
						visible={applyModal}
						animationType="fade"
						transparent={true}
						onRequestClose={() => setApplyModal(false)}
					>
						<View
							style={{
								flex: 1,
								backgroundColor: 'rgba(0, 0, 0, 0.5)',
								justifyContent: 'center'
							}}
						>
							{/* <KeyboardAwareScrollView> */}
							<View
								style={{
									backgroundColor: colors.onSecondary,
									borderRadius: 15,
									elevation: 5,
									height: height / (3 / 2)
								}}
							>
								<ApplyCoupon setApplyModal={setApplyModal} />
							</View>
							{/* </KeyboardAwareScrollView> */}
						</View>
					</Modal>

					<OrderSummary />
				</View>
			</ScrollView>
			<View style={styles.cartContainer}>
				<CustomButtom
					loading={false}
					onPress={() => {
						console.log('press');
					}}
					mode="text"
					text="Please Login to proceed to payment"
					disabled={false}
					styles={{
						height: DefaultStyles.DefaultButtonHeight - 8,
						borderRadius: DefaultStyles.DefaultButtonHeight - 40,
						borderColor: colors.primary
					}}
					textStyles={[styles.buttonText, { color: colors.onSecondary }]}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFF'
	},
	cartContainer: {
		width: '90%',
		alignSelf: 'center',
		marginTop: 15
	},
	buttonText: {
		fontFamily: FontGilroy.Medium,
		marginTop: 8,
		fontSize: 12,
		letterSpacing: 0.5
	},
	couponContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 10
	},
	text: {
		fontSize: 12,
		fontFamily: FontGilroy.Medium
	},
	modalContainer: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		justifyContent: 'center',
		alignItems: 'center'
	}
});
