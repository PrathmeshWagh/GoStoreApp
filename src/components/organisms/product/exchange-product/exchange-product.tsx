import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Rupee } from 'components/atoms';
import { useTheme } from '@hooks/index';
import { FontGilroy } from 'primitives';

export default function ExchangeProduct({ setIsExchangeVisible }: any) {
	const { colors } = useTheme();

	const openExchangePage = () => {
		setIsExchangeVisible(true);
	};

	return (
		<View>
			<TouchableOpacity
				style={[styles.exchangeContainer, { borderColor: colors.primary }]}
				onPress={openExchangePage}
			>
				<Text style={styles.text}>Buy with Exchange</Text>
				<Text style={styles.text}>
					save upto <Rupee money={14000} />
				</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={[styles.exchangeContainer, { borderColor: colors.primary, marginVertical: 15 }]}
			>
				<Text style={styles.text}>Buy without Exchange</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	exchangeContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderWidth: 1,
		padding: 10,
		borderRadius: 10
	},
	text: {
		fontSize: 13,
		fontFamily: FontGilroy.Medium
	}
});
