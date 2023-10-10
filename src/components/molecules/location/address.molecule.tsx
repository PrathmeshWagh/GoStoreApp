import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TouchableRipple, Text } from 'react-native-paper';

import { border1, itemsBetween } from '@helpers/index';
import { DefaultStyles } from '@primitives/index';
import { useTheme } from '@hooks/index';
import { CustomButtom, TextLoader } from '@atoms/index';

interface AddressProps {
	handleLocation: () => void;
	loading: boolean;
	address: string;
	isLoading: boolean;
	handleLocationManual: () => void;
}

const Address = ({
	handleLocation,
	loading,
	address,
	isLoading,
	handleLocationManual
}: AddressProps) => {
	const { colors } = useTheme();

	return (
		<View
			style={[
				styles.addressDetails,
				{ backgroundColor: colors.onSecondary, shadowColor: colors.secondary }
			]}
		>
			<View style={[{ ...itemsBetween(), marginBottom: DefaultStyles.DefaultPadding + 10 }]}>
				<Text variant="titleMedium" style={[{ color: colors.textGrey1 }]}>
					{'select your location'.toUpperCase()}
				</Text>
				<TouchableRipple
					style={[{ ...border1({ radius: 4, color: colors.grey }) }, styles.changeBtn]}
					onPress={handleLocationManual}
				>
					<Text variant="titleSmall" style={{ color: colors.textGrey1 }}>
						{'change'.toUpperCase()}
					</Text>
				</TouchableRipple>
			</View>
			{isLoading ? (
				<TextLoader times={2} />
			) : (
				<>
					<Text
						variant="titleMedium"
						style={[
							{
								marginBottom: DefaultStyles.DefaultPadding - 4,
								lineHeight: DefaultStyles.DefaultPadding + 4
							}
						]}
					>
						{address}
					</Text>
					<CustomButtom
						styles={{ marginTop: DefaultStyles.DefaultPadding }}
						text="confirm location"
						uppercase
						onPress={handleLocation}
						loading={loading}
						disabled={loading}
					/>
				</>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	addressDetails: {
		paddingVertical: DefaultStyles.DefaultPadding,
		paddingHorizontal: DefaultStyles.DefaultPadding,
		borderTopLeftRadius: DefaultStyles.DefaultRadius,
		borderTopRightRadius: DefaultStyles.DefaultRadius,
		elevation: 5,
		shadowOpacity: 0.3,
		shadowRadius: 5,
		shadowOffset: { width: 0, height: 0 },
		paddingBottom: DefaultStyles.DefaultPadding + 32,
		height: 250
	},
	changeBtn: {
		paddingHorizontal: DefaultStyles.DefaultPadding - 10,
		paddingVertical: DefaultStyles.DefaultPadding - 14
	}
});

export default Address;
