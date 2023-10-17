import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { CustomColors } from 'constants/colors.constants';

const THUMB_RADIUS_LOW = 10;
const THUMB_RADIUS_HIGH = 14;

const Thumb = ({ name }) => {
	return <View style={name === 'high' ? styles.rootHigh : styles.rootLow} />;
};

const styles = StyleSheet.create({
	rootLow: {
		width: THUMB_RADIUS_LOW * 2,
		height: THUMB_RADIUS_LOW * 2,
		borderRadius: THUMB_RADIUS_LOW,
		borderWidth: 0.5,
		borderColor: CustomColors.textGrey1,
		backgroundColor: CustomColors.onSecondary
	},
	rootHigh: {
		width: THUMB_RADIUS_HIGH * 2,
		height: THUMB_RADIUS_HIGH * 2,
		borderRadius: THUMB_RADIUS_HIGH,
		borderWidth: 0.5,
		borderColor: CustomColors.secondary,
		backgroundColor: CustomColors.tertiary
	}
});

export default memo(Thumb);
