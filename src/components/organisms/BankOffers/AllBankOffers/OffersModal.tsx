import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { useTheme } from '@hooks/index';
import { FontGilroy } from 'primitives';

export default function OffersModal({ bankOffersData, noCostEmiOffers }: any) {
	const { colors } = useTheme();
	console.log('offer data in offer modal', bankOffersData);

	return (
		<View style={styles.container}>
			<View
				style={[styles.offerHeader, { backgroundColor: colors.tertiary, alignItems: 'center' }]}
			>
				<Text style={{ fontFamily: FontGilroy.Bold, fontSize: 18 }}>Availble Offer</Text>
				<Text>(Applicable on Checkout)</Text>
			</View>
			<View style={{ marginHorizontal: 16 }}>
				<Text style={{ fontFamily: FontGilroy.SemiBold, fontSize: 18 }}>Bank Offers</Text>
			</View>
			<ScrollView>
				{bankOffersData.map((offer, index) => (
					<View
						style={[styles.offerContainer, { backgroundColor: colors.tertiary, marginTop: 10 }]}
					>
						<View style={[styles.greenBox, { backgroundColor: colors.primary }]}></View>
						<View style={{ marginHorizontal: 8, flex: 1 }}>
							<Text numberOfLines={2}>{offer.offerTitle}</Text>
						</View>
						<Text
							style={{
								textDecorationLine: 'underline',
								color: colors.primary,
								fontFamily: FontGilroy.SemiBold
							}}
						>
							T&C
						</Text>
					</View>
				))}
			</ScrollView>
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
		borderRadius: 5
	},
	offerContainer: {
		borderRadius: 8,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: '95%',
		alignSelf: 'center',
		paddingRight: 10
	},
	greenBox: {
		width: 20,
		paddingVertical: 20,
		borderTopLeftRadius: 8,
		borderBottomLeftRadius: 8
	}
});
