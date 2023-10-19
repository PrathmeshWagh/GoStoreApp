import { View, Text, StyleSheet, Modal } from 'react-native';
import React, { useState } from 'react';
import { CustomColors } from 'constants/colors.constants';
import { DefaultStyles, FontGilroy } from 'primitives';
import CustomButtom from './button.atom';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface LogOutModalProps {
	setIsLogoutModalVisible: () => void;
	isLogoutModalVisible: boolean;
}

const LogoutModal = (props: LogOutModalProps) => {
	const { setIsLogoutModalVisible, isLogoutModalVisible } = props;

	const btnHandler = () => {
		setIsLogoutModalVisible(false);
	};

	return (
		<View>
			<Modal animationType="fade" transparent={true} visible={isLogoutModalVisible}>
				<View style={styles.modalContainer}>
					<View style={styles.innerContainer}>
						<View style={styles.closeIcon}>
							<Icon name={'close'} size={25} onPress={btnHandler} />
						</View>

						<Text style={styles.text}>
							Are you sure you want to log out from{' '}
							<Text
								style={{
									color: CustomColors.primary,
									fontFamily: FontGilroy.SemiBold,
									fontSize: 15
								}}
							>
								GoStore.com
							</Text>
						</Text>
						<View style={styles.btnContainer}>
							<CustomButtom
								text="Yes"
								onPress={btnHandler}
								loading={false}
								disabled={false}
								styles={[styles.btn, styles.yesbtn]}
								textStyles={{ color: CustomColors.cart }}
							/>
							<CustomButtom
								text="No"
								onPress={btnHandler}
								loading={false}
								disabled={false}
								styles={styles.btn}
							/>
						</View>
					</View>
				</View>
			</Modal>
		</View>
	);
};

export default LogoutModal;
const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)'
	},
	innerContainer: {
		width: '100%',
		backgroundColor: CustomColors.onSecondary,
		borderRadius: 8
	},
	closeIcon: {
		alignItems: 'flex-end',
		paddingRight: DefaultStyles.DefaultPadding,
		paddingTop: DefaultStyles.DefaultPadding
	},
	text: {
		fontSize: 15,
		fontFamily: FontGilroy.Medium,
		color: CustomColors.cart,
		paddingHorizontal: DefaultStyles.DefaultPadding,
		paddingBottom: DefaultStyles.DefaultPadding + 5
	},
	btnContainer: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		marginBottom: 30
	},
	btn: {
		width: '25%',
		height: 40
	},
	yesbtn: {
		backgroundColor: CustomColors.onSecondary,
		borderWidth: 1,
		borderColor: CustomColors.cart
	}
});
