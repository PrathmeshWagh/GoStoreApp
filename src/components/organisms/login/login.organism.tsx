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

	const { mutate: getOtp } = useGenerateOtpMutation();

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
			<View style={{ width: '85%', alignSelf: 'center' }}>
				<View>
					<Text style={{ textAlign: 'center', margin: 10, fontFamily: FontGilroy.SemiBold }}>
						Enter Your mobile number
					</Text>
				</View>
				<View>
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
				</View>
				<View style={{ marginTop: 10 }}>
					<Text style={[{ fontSize: 12 }, styles.labelFont]}>
						By continuing, you agree to GoStor's{' '}
						<Text style={styles.underline}>Term & Conditions</Text> and{' '}
						<Text style={styles.underline}>Privacy Policy</Text>
					</Text>
				</View>
				<CustomButtom
					onPress={() => {
						GenerateOtp();
					}}
					loading={false}
					disabled={mobileNumber.length !== 10}
					mode="text"
					text="Get OTP"
					styles={[
						styles.btnStyles,
						{ backgroundColor: mobileNumber.length === 10 ? colors.primary : 'gray' }
					]}
					textStyles={[{ color: colors.onSecondary }, styles.textStyle]}
					varaint="titleLarge"
				/>
				<View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 35 }}>
					<Text style={styles.labelFont}>Don't have an account ?</Text>
					<TouchableOpacity
						onPress={() => {
							navigate(RouteConstants.SignUpRoute);
						}}
					>
						<Text style={[{ color: colors.primary, marginLeft: 5 }, styles.labelFont]}>
							Sign up
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</KeyboardAwareScrollView>
	);
}

const styles = StyleSheet.create({
	underline: {
		textDecorationLine: 'underline',
		fontFamily: FontGilroy.Bold
	},
	btnStyles: {
		height: DefaultStyles.DefaultButtonHeight,
		borderRadius: DefaultStyles.DefaultButtonHeight - 40,
		marginTop: 20
	},
	textStyle: {
		marginTop: 8,
		fontFamily: FontGilroy.Bold
	},
	labelFont: {
		fontFamily: FontGilroy.Medium
	},
	tnc: {
		marginRight: 8
	},
	checkbox: {
		backgroundColor: '#cccc',
		borderRadius: 2
	}
});
