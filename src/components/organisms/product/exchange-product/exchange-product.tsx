import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Rupee } from 'components/atoms';
import { useTheme } from '@hooks/index';

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
				<Text>Buy with Exchange</Text>
				<Text>
					save upto <Rupee money={14000} />
				</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	exchangeContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderWidth: 1,
		padding: 12,
		borderRadius: 10
	}
});
