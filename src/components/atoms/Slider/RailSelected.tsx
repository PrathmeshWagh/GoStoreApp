import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { CustomColors } from 'constants/colors.constants';

const RailSelected = () => {
	return <View style={styles.root} />;
};

export default memo(RailSelected);

const styles = StyleSheet.create({
	root: {
		height: 4,
		backgroundColor: CustomColors.primary,
		borderRadius: 2
	}
});
