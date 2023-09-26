import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { CustomButtom } from 'components/atoms';
import { DefaultStyles, FontGilroy } from '@primitives/index';
import { useTheme } from '@hooks/index';
import { useDimensions } from '@hooks/index';
import { Image } from 'react-native';
import { LoginWithNumber } from 'api/auth/use-login';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useEnhancedNavigation } from '@hooks/index';
import { RouteConstants } from 'routes/constants.routes';
// import OTPTextView from 'react-native-otp-textinput';
import Clipboard from '@react-native-clipboard/clipboard';
import Images from 'assets/Images';
import { useLoginMutation } from 'api/auth/use-login';
import OTPInputView from '@twotalltotems/react-native-otp-input';

interface RouteProps {
	route: any;
}

export default function OtpScreen({ route }: RouteProps) {
	const { mobileNumber } = route.params;
	const { navigate } = useEnhancedNavigation();
	const { width, height } = useDimensions();
	const { colors } = useTheme();
	const [otp, setOtp] = useState('');
	const [resendTimer, setResendTimer] = useState(30);
	const [isResendDisabled, setIsResendDisabled] = useState(true);

	const { mutate: login } = useLoginMutation();

	let isNewUser: boolean = false;
	useEffect(() => {
		let interval: any;

		if (isResendDisabled && resendTimer > 0) {
			interval = setInterval(() => {
				setResendTimer((prevTimer) => prevTimer - 1);
			}, 1000);
		} else if (resendTimer === 0) {
			setIsResendDisabled(false);
		}
		return () => clearInterval(interval);
	}, [isResendDisabled, resendTimer]);

	const handleResendClick = () => {
		setIsResendDisabled(true);
		setResendTimer(30);
	};

	const VerifyOtp = async () => {
		if (otp) {
			login({
				mobile: mobileNumber,
				otp: otp,
				isNewUser
			});
		} else {
			console.log('Please enter valid OTP');
		}
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
			<View style={{ width: '85%', alignSelf: 'center' }}>
				<View>
					<Text style={[styles.codeText, { marginTop: 10 }]}>Just One Step Away!</Text>
					<Text style={[styles.codeText, { fontSize: 17 }]}>Verification Code</Text>
				</View>
				<View>
					<Text style={[styles.codeText, { fontSize: 16, marginTop: 15 }]}>
						Enter Verification Code here
					</Text>
				</View>

				<OTPInputView
					style={{ width: '80%', height: height * 0.1 }}
					pinCount={6}
					onCodeChanged={(code) => setOtp(code)}
					autoFocusOnLoad
					codeInputFieldStyle={{
						borderColor: 'gray',
						color: '#000',
						marginHorizontal: 3,
						borderWidth: 2,
						borderRadius: 5
					}}
					codeInputHighlightStyle={{
						borderColor: colors.primary,
						marginHorizontal: 3,
						borderWidth: 2,
						borderRadius: 5
					}}
				/>

				<View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'center' }}>
					<Text style={styles.labelFont}>
						{isResendDisabled ? `Didn't recieve OTP Code` : 'I did not get a Code!'}{' '}
					</Text>
					<TouchableOpacity onPress={handleResendClick} disabled={isResendDisabled}>
						<Text style={[styles.labelFont, { color: colors.primary }]}>
							{isResendDisabled ? `Retry in ${resendTimer} seconds` : 'Resend'}
						</Text>
					</TouchableOpacity>
				</View>
				<CustomButtom
					onPress={() => {
						VerifyOtp();
					}}
					loading={false}
					disabled={otp.length !== 6}
					mode="text"
					text="Verify OTP"
					styles={[styles.btnStyles, { backgroundColor: colors.primary }]}
					textStyles={[{ color: otp.length === 6 ? 'white' : '#9CA3B0' }, styles.textStyle]}
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
		marginRight: 8,
		marginTop: 1
	},
	checkbox: {
		backgroundColor: '#cccc',
		borderRadius: 2
	},
	roundedTextInput: {
		borderRadius: 10,
		borderWidth: 4
	},
	codeText: {
		textAlign: 'center',
		fontFamily: FontGilroy.SemiBold
	}
});
