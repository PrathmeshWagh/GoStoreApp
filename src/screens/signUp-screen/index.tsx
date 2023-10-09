import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { CustomButtom } from 'components/atoms';
import { DefaultStyles, FontGilroy } from '@primitives/index';
import { useTheme } from '@hooks/index';
import { useDimensions, usePermissionHandlers } from '@hooks/index';
import { Image } from 'react-native';
import AnimatedInputField from 'components/atoms/AnimatedInputField';
import { LoginWithNumber } from 'api/auth/use-login';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useEnhancedNavigation } from '@hooks/index';
import { RouteConstants } from 'routes/constants.routes';
import Icon from 'react-native-vector-icons/Feather';
import { GenerateOTP } from 'api/auth/use-generate-otp';
import Images from 'assets/Images';

const SignUpScreen = () => {
	const { colors } = useTheme();
	const { navigate } = useEnhancedNavigation();
	const { width, height } = useDimensions();

	const [mobileNumber, setmobileNumber] = useState('');
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [referralCode, setReferralCode] = useState('');
	const [tnc, setTnc] = useState<boolean>(false);

	// Error state
	const [mobileNumberError, setmobileNumberError] = useState('');
	const [nameError, setNameError] = useState('');
	const [emailError, setEmailError] = useState('');

	let isNewUser: boolean = false;
	const GenerateOtp = async () => {
		if (validateForm()) {
			try {
				const response = await GenerateOTP({ mobile: mobileNumber }, isNewUser);
				if (response) {
					navigate(RouteConstants.OtpRoute, { mobileNumber: mobileNumber });
				}
			} catch (error) {
				console.log('error while generating OTP', error);
			}
		}
	};

	const validateForm = () => {
		if (name.trim() === '') {
			return false;
		}

		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailPattern.test(email)) {
			return false;
		}

		if (mobileNumber.length < 10) {
			return false;
		}

		return true;
	};

	const validateEmail = (email: string) => {
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return !emailPattern.test(email);
	};

	const validateName = (name: string) => {
		return name.trim() === '';
	};

	const validatemobileNumber = (mobileNumber: string) => {
		return mobileNumber.length !== 10;
	};

	return (
		<KeyboardAwareScrollView>
			<View>
				<Image
					source={Images.LOGIN_BANNER}
					style={{ width: width, height: height * 0.4 }}
					resizeMode="cover"
				/>
			</View>
			<View style={styles.container}>
				<View>
					<Text style={styles.headerText}>Enter Your mobile number</Text>
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
							setmobileNumberError('');
						}}
						showAnimatedLabel={true}
						onBlur={() => {
							if (validatemobileNumber(mobileNumber)) {
								setmobileNumberError('Mobile Number is required');
							}
						}}
						error={mobileNumberError}
					/>
					<AnimatedInputField
						placeholder="Name"
						label="Name"
						value={name}
						onChangeText={(text) => {
							setName(text);
							setNameError('');
						}}
						showAnimatedLabel={true}
						onBlur={() => {
							if (validateName(name)) {
								setNameError('Name is required');
							}
						}}
						error={nameError}
					/>
					<AnimatedInputField
						placeholder="Email"
						label="Email"
						keyboardType="email-address"
						value={email}
						onChangeText={(text) => {
							setEmail(text);
							setEmailError('');
						}}
						showAnimatedLabel={true}
						onBlur={() => {
							if (validateEmail(email)) {
								setEmailError('Please enter a valid email');
							}
						}}
						error={emailError}
					/>
					<AnimatedInputField
						placeholder="Referral Code (Optional)"
						label="Referral Code"
						value={referralCode}
						onChangeText={(text) => {
							setReferralCode(text);
						}}
						showAnimatedLabel={true}
					/>
				</View>
				<View style={styles.checkboxContainer}>
					<TouchableOpacity
						style={styles.checkbox}
						onPress={() => {
							setTnc(!tnc);
						}}
					>
						{tnc ? (
							<Icon
								name="check"
								color={colors.onSecondary}
								size={18}
								style={[styles.checkedIcon, { backgroundColor: colors.primary }]}
							/>
						) : (
							<Icon name="square" color={colors.grey} size={22} />
						)}
					</TouchableOpacity>
					<Text style={styles.tncText}>
						By registering, you agree to GoStor's{' '}
						<Text style={styles.underline}>Terms & Conditions</Text> and{' '}
						<Text style={styles.underline}>Privacy Policy</Text>
					</Text>
				</View>
				<CustomButtom
					onPress={() => {
						GenerateOtp();
					}}
					loading={false}
					disabled={!tnc}
					mode="text"
					text="Sign Up"
					styles={[styles.btnStyles, { backgroundColor: colors.primary }]}
					textStyles={[{ color: tnc ? colors.onSecondary : colors.grey }, styles.textStyle]}
					varaint="titleLarge"
				/>
				<View style={styles.loginContainer}>
					<Text style={styles.labelFont}>Already have an account?</Text>
					<TouchableOpacity
						onPress={() => {
							navigate(RouteConstants.LoginRoute);
						}}
					>
						<Text style={[styles.loginLink, { color: colors.primary }]}>Login</Text>
					</TouchableOpacity>
				</View>
			</View>
		</KeyboardAwareScrollView>
	);
};

export default SignUpScreen;

const styles = StyleSheet.create({
	container: {
		width: '85%',
		alignSelf: 'center'
	},
	headerText: {
		textAlign: 'center',
		margin: 10,
		fontFamily: FontGilroy.SemiBold
	},
	checkboxContainer: {
		marginTop: 10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start'
	},
	checkbox: {
		marginRight: 8,
		marginTop: 1
	},
	checkedIcon: {
		borderRadius: 5
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
	textStyle: {
		marginTop: 8,
		fontFamily: FontGilroy.Bold
	},
	loginContainer: {
		flexDirection: 'row',
		alignSelf: 'center',
		marginTop: 35
	},
	labelFont: {
		fontFamily: FontGilroy.Medium
	},
	loginLink: {
		marginLeft: 5,
		fontFamily: FontGilroy.Medium
	}
});
