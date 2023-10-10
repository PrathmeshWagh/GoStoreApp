import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

import { useTheme } from '@hooks/index';
import { DefaultStyles } from '@primitives/index';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CarryIcon from '@assets/icons/productDetails/carry_bag.svg';

interface CustomButtomProps {
	onPress: () => void;
	loading: boolean;
	disabled: boolean;
	uppercase?: boolean;
	styles?: any;
	textStyles?: any;
	mode?: 'text' | 'elevated' | 'outlined' | 'contained' | 'contained-tonal' | undefined;
	text: string;
	varaint?: any;
	children?: React.ReactNode;
	buttonColor?: string;
	icon?: React.ReactNode;
}

const CustomButtom = (props: CustomButtomProps) => {
	const { colors } = useTheme();
	const {
		onPress,
		loading,
		uppercase,
		styles,
		mode = 'elevated',
		disabled,
		text,
		textStyles,
		icon
	} = props;

	return (
		<Button
			mode={mode}
			buttonColor={mode === 'outlined' ? 'transparent' : colors.primary}
			textColor={colors.onSecondary}
			onPress={onPress}
			style={[btnStyles.btn, styles]}
			uppercase={uppercase ? uppercase : false}
			loading={loading}
			disabled={disabled}
			labelStyle={[
				{ color: loading ? colors.secondary : colors.onSecondary },
				btnStyles.text,
				textStyles
			]}
		>
			{text}
		</Button>
	);
};

const btnStyles = StyleSheet.create({
	btn: {
		height: DefaultStyles.DefaultButtonHeight,
		borderRadius: DefaultStyles.DefaultRadius,
		justifyContent: 'center'
	},
	text: {
		letterSpacing: 1.6
	}
});

export default CustomButtom;
