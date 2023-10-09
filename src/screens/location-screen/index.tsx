import React from 'react';
import { StyleSheet } from 'react-native';

import Location from '@organisms/location/location.organism';
import { TouchableRipple } from 'react-native-paper';
import { BackIcon } from '@icons/index';
import { DefaultStyles } from '@primitives/index';
import { useEnhancedNavigation, useTheme } from '@hooks/index';
import { centerBoth, radiusFull } from '@helpers/index';

const LocationScreen = () => {
	const { colors } = useTheme();
	const { pop } = useEnhancedNavigation();

	return (
		<>
			<TouchableRipple
				style={[styles.backButton, { backgroundColor: colors.onSecondary }]}
				onPress={() => pop()}
			>
				<BackIcon size={26} color={colors.secondary} />
			</TouchableRipple>
			<Location />
		</>
	);
};

const styles = StyleSheet.create({
	backButton: {
		position: 'absolute',
		top: 52,
		left: 24,
		zIndex: 1,
		width: DefaultStyles.DefaultPadding + 16,
		height: DefaultStyles.DefaultPadding + 16,
		...centerBoth(),
		...radiusFull()
	}
});

export default LocationScreen;
