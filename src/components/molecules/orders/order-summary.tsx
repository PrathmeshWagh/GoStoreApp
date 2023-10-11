import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import BasicCard from '@atoms/basic-card.atom';
import { priceSummaryAttr } from 'helpers/constants/orderContants';
import Divider from 'components/atoms/divider.atom';
import { FontGilroy } from 'primitives';
import { Rupee } from 'components/atoms';

interface OrderSummaryProps {
	priceBreakUp?: {
		bankDiscount: string;
		buyingPrice: string;
		couponDiscount: number;
		mrp: string;
		shipmentCharge: string;
		itemDiscount?: number;
		totalPrice?: number;
		platformDiscount?: number;
		exchangeValue?: number | string;
		abbPrice?: number;
	};
}

const OrderSummary: React.FC<OrderSummaryProps> = () => {
	return (
		<BasicCard>
			<Text style={{ fontFamily: FontGilroy.Medium, marginBottom: 5, marginTop: 8 }}>
				Order Summary
			</Text>
			{priceSummaryAttr.map((attr, idx) => (
				<View key={attr.name}>
					<View style={styles.attribute}>
						<Text style={styles.attributeName}>{attr.name}</Text>
						<Text style={styles.attributeValue}>
							<Rupee money={120} styles={styles.mrp} />
						</Text>
					</View>
					{idx !== priceSummaryAttr.length - 1 && <Divider />}
				</View>
			))}
		</BasicCard>
	);
};
export default OrderSummary;

const styles = StyleSheet.create({
	attribute: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: 10
	},
	attributeName: {
		fontSize: 13,
		fontFamily: FontGilroy.Medium
	},
	attributeValue: {
		fontSize: 16,
		fontFamily: FontGilroy.Medium
	},
	mrp: {
		fontFamily: FontGilroy.Medium,
		fontSize: 14
	}
});
