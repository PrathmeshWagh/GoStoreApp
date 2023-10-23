import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { CustomColors } from 'constants/colors.constants';
import { DefaultStyles, FontGilroy } from 'primitives';
import CustomTextInput from 'components/atoms/custom-input.atom';
import { CustomButtom } from 'components/atoms';

const UPIDetails = () => {
	return (
		<View style={styles.container}>
			<Text style={{ color: CustomColors.cart, fontSize: 15, fontFamily: FontGilroy.Medium }}>
				Please Enter UPI details
			</Text>
			<CustomTextInput name="Enter UPI ID" />
			<CustomButtom
				text="Verify and Pay"
				styles={styles.btnContainer}
				onPress={() => null}
				loading={false}
				disabled={false}
			/>
		</View>
	);
};

export default UPIDetails;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: DefaultStyles.DefaultPadding
	},
	btnContainer: {}
});
