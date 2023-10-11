import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
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

export default function Cart() {
	const { navigate } = useEnhancedNavigation();
	const { width, height } = useDimensions();
	const { colors } = useTheme();

	let isLogin = false;

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
					<View style={{ marginTop: 15, marginBottom: 25 }}>
						<BasicCard style={{ paddingVertical: 8 }}>
							<View style={styles.couponContainer}>
								<View style={{ flexDirection: 'row', alignItems: 'center' }}>
									<Text>Icon</Text>
									<Text style={[styles.text, { fontSize: 15, marginLeft: 8 }]}>Apply Coupon</Text>
								</View>
								<Icon name={'chevron-right'} size={20} color={colors.secondary} />
							</View>
						</BasicCard>
					</View>
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
	}
});
