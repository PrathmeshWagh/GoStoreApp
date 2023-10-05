import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '@hooks/index';
import { DefaultStyles, FontGilroy } from '@primitives/index';

const OfferItem = ({ title, description, onPress }) => {
	const { colors } = useTheme();
	return (
		<View style={styles.offer}>
			<View
				style={{
					flexDirection: 'row',
					backgroundColor: '#EFF5F8',
					borderRadius: 5,
					paddingHorizontal: 5
				}}
			>
				<Icon name="brightness-percent" size={20} color={colors.primary} />
				<Text style={styles.text}>{title}</Text>
			</View>
			<View
				style={{
					flex: 1,
					justifyContent: 'space-between',
					paddingHorizontal: 6,
					paddingVertical: 3
				}}
			>
				<Text>{description}</Text>
				<TouchableOpacity onPress={onPress}>
					<Text style={{ textDecorationLine: 'underline' }}>9 offer</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default OfferItem;

const styles = StyleSheet.create({
	text: {
		fontSize: 16,
		fontFamily: FontGilroy.Medium,
		textAlign: 'center'
	},
	offer: {
		flex: 1,
		height: 110,
		borderWidth: 1,
		borderRadius: 5,
		borderColor: '#e5e7eb'
	}
});
