import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '@hooks/index';
import { DefaultStyles, FontGilroy } from '@primitives/index';

interface OfferItemProps {
	title: string;
	description: string;
	onPress: () => void;
	icon?: any;
	offerType: string;
	setShowOfferType: (offerType) => void;
}

const OfferItem = (props: OfferItemProps) => {
	const { title, description, onPress, setShowOfferType, offerType } = props;
	const { colors } = useTheme();
	return (
		<View style={[styles.offer, { borderColor: colors.bordercolor }]}>
			<View style={[styles.titleContainer, { backgroundColor: colors.offerbg }]}>
				<Text style={styles.text}>{title}</Text>
			</View>
			<View style={styles.descriptionContainer}>
				<Text style={styles.text}>{description}</Text>
				<TouchableOpacity
					onPress={() => {
						onPress();
						setShowOfferType(offerType);
					}}
				>
					<Text
						style={{ textDecorationLine: 'underline', fontFamily: FontGilroy.Medium, fontSize: 13 }}
					>
						9 offer
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default OfferItem;

const styles = StyleSheet.create({
	text: {
		fontSize: 13,
		fontFamily: FontGilroy.Medium,
		textAlign: 'left',
		marginLeft: 5
	},
	offer: {
		flex: 1,
		height: 110,
		borderWidth: 1,
		borderRadius: 5
	},
	titleContainer: {
		flexDirection: 'row',
		borderRadius: 5,
		paddingHorizontal: 10,
		paddingVertical: 5
	},
	descriptionContainer: {
		flex: 1,
		justifyContent: 'space-between',
		paddingHorizontal: 6,
		paddingVertical: 3
	}
});
