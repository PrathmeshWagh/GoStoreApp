import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { CustomButtom } from 'components/atoms';
import { DefaultStyles, FontGilroy } from '@primitives/index';
import { useTheme } from '@hooks/index';
import { useDimensions, usePermissionHandlers } from '@hooks/index';
import { Image } from 'react-native';
import AnimatedInputField from 'components/atoms/AnimatedInputField';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useEnhancedNavigation } from '@hooks/index';
import { RouteConstants } from 'routes/constants.routes';
import { GenerateOTP } from 'api/auth/use-generate-otp';
import Images from 'assets/Images';
import { useGenerateOtpMutation } from 'api/auth/use-generate-otp';

export default function Login() {
	const { colors } = useTheme();
	const { navigate, router } = useEnhancedNavigation();
	const { width, height } = useDimensions();
	const [mobileNumber, setmobileNumber] = useState('');
	const [numberError, setNumberError] = useState(false);

	const { mutate: getOtp, isLoading: generateOTPloading } = useGenerateOtpMutation();

	const GenerateOtp = async () => {
		getOtp({ mobile: mobileNumber });
	};

	// const validateNumber = (number: string) => {
	// 	return number.length === 10;
	// };

	return (
		<KeyboardAwareScrollView>
			<View>
				<Image
					source={Images.LOGIN_BANNER}
					style={{ width: width, height: height * 0.4 }}
					resizeMode="cover"
				/>
			</View>
			<View style={styles.contentContainer}>
				<View style={styles.section}>
					<Text style={styles.headerText}>Enter Your mobile number</Text>
				</View>

				<AnimatedInputField
					placeholder="Phone number"
					label="Phone Number"
					keyboardType="phone-pad"
					maxLength={10}
					value={mobileNumber}
					onChangeText={(text) => {
						setmobileNumber(text);
					}}
					showAnimatedLabel={true}
					// error={'Mobile Number is required'}
				/>

				<View style={styles.section}>
					<Text style={styles.tncText}>
						By continuing, you agree to GoStor's{' '}
						<Text style={styles.underline}>Term & Conditions</Text> and{' '}
						<Text style={styles.underline}>Privacy Policy</Text>
					</Text>
				</View>
				<CustomButtom
					onPress={() => {
						GenerateOtp();
					}}
					loading={generateOTPloading}
					disabled={mobileNumber.length !== 10}
					mode="text"
					text="Get OTP"
					styles={[
						styles.btnStyles,
						{ backgroundColor: mobileNumber.length === 10 ? colors.primary : colors.grey }
					]}
					textStyles={[{ color: colors.onSecondary }, styles.textStyle]}
					varaint="titleLarge"
				/>
				<View style={styles.section}>
					<View style={styles.signupLink}>
						<Text style={styles.labelText}>Don't have an account ?</Text>
						<TouchableOpacity
							onPress={() => {
								navigate(RouteConstants.SignUpRoute);
							}}
						>
							<Text style={[styles.linkText, { color: colors.primary }]}>Sign up</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</KeyboardAwareScrollView>
	);
}

const styles = StyleSheet.create({
	contentContainer: {
		width: '85%',
		alignSelf: 'center'
	},
	section: {
		marginVertical: 8
	},
	headerText: {
		textAlign: 'center',
		margin: 10,
		fontFamily: FontGilroy.SemiBold,
		fontSize: 17
	},
	tncText: {
		fontSize: 12,
		fontFamily: FontGilroy.Medium
	},
	underline: {
		textDecorationLine: 'underline',
		fontFamily: FontGilroy.Bold
	},
	btnStyles: {
		height: DefaultStyles.DefaultButtonHeight,
		borderRadius: DefaultStyles.DefaultButtonHeight - 40,
		marginTop: 20
	},
	labelText: {
		fontFamily: FontGilroy.Medium
	},
	signupLink: {
		flexDirection: 'row',
		alignSelf: 'center',
		marginTop: 35
	},
	linkText: {
		marginLeft: 5,
		fontFamily: FontGilroy.Medium
	},
	textStyle: {
		marginTop: 8,
		fontFamily: FontGilroy.Bold
	}
});
