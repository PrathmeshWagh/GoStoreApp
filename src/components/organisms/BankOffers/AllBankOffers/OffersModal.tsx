import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { useTheme } from '@hooks/index';
import { FontGilroy } from 'primitives';

interface OfferModalProps {
	bankOffersData?: any;
	noCostEmiOffers?: any;
	couponOfferData?: any;
	onPress: () => void;
	showOfferType?: any;
	offerTypes: any;
}

export default function OffersModal(props: OfferModalProps) {
	const { bankOffersData, noCostEmiOffers, couponOfferData, onPress, showOfferType, offerTypes } =
		props;
	const { colors } = useTheme();
	console.log('modal', showOfferType, offerTypes);
	console.log('coupon', couponOfferData);

	return (
		<View style={styles.container}>
			<View style={[styles.offerHeader, { backgroundColor: colors.tertiary }]}>
				<View style={{ flexDirection: 'row' }}>
					<Text style={{ fontFamily: FontGilroy.SemiBold, fontSize: 16 }}>Availble Offer</Text>
					<Text style={{ fontSize: 13, marginLeft: 5 }}>(Applicable on Checkout)</Text>
				</View>
				<TouchableOpacity onPress={onPress}>
					<Text>Close</Text>
				</TouchableOpacity>
			</View>
			{((bankOffersData && bankOffersData.length > 0 && showOfferType === offerTypes['BANK']) ||
				(!showOfferType && bankOffersData.length > 0)) && (
				<>
					<View style={{ marginHorizontal: 16 }}>
						<Text style={{ fontFamily: 'FontGilroy-Medium', fontSize: 16, marginVertical: 10 }}>
							Bank Offers
						</Text>
					</View>
					<ScrollView>
						{bankOffersData &&
							bankOffersData.map((offer, index) => (
								<View style={[styles.offerContainer, { backgroundColor: colors.tertiary }]}>
									<View style={[styles.greenBox, { backgroundColor: colors.primary }]}></View>
									<View style={{ marginHorizontal: 8, flex: 1 }}>
										<Text numberOfLines={2} style={{ fontSize: 12 }}>
											{offer.offerTitle}
										</Text>
									</View>
									<Text
										style={{
											textDecorationLine: 'underline',
											color: colors.primary,
											fontFamily: 'FontGilroy-Medium',
											fontSize: 12
										}}
									>
										T&C
									</Text>
								</View>
							))}
					</ScrollView>
				</>
			)}

			{((couponOfferData &&
				couponOfferData.length > 0 &&
				showOfferType === offerTypes['COUPONS']) ||
				(!showOfferType && couponOfferData.length > 0)) && (
				<>
					<View style={{ marginHorizontal: 16 }}>
						<Text style={{ fontFamily: 'FontGilroy-Medium', fontSize: 16, marginVertical: 10 }}>
							Platform Offers
						</Text>
					</View>
					<ScrollView>
						{couponOfferData &&
							couponOfferData.map((offer, index) => (
								<View style={[styles.offerContainer, { backgroundColor: colors.tertiary }]}>
									<View style={[styles.greenBox, { backgroundColor: colors.primary }]}></View>
									<View style={{ marginHorizontal: 8, flex: 1 }}>
										<Text numberOfLines={2} style={{ fontSize: 12 }}>
											{offer.description}
										</Text>
									</View>
									<Text
										style={{
											textDecorationLine: 'underline',
											color: colors.primary,
											fontFamily: 'FontGilroy-Medium',
											fontSize: 12
										}}
									>
										T&C
									</Text>
								</View>
							))}
					</ScrollView>
				</>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		borderRadius: 8,
		marginBottom: 16
	},
	offerHeader: {
		flexDirection: 'row',
		padding: 16,
		borderRadius: 5,
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	offerContainer: {
		borderRadius: 8,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: '95%',
		alignSelf: 'center',
		paddingRight: 10,
		marginTop: 10
	},
	greenBox: {
		width: 20,
		paddingVertical: 25,
		borderTopLeftRadius: 8,
		borderBottomLeftRadius: 8
	}
});
