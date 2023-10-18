import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { DefaultStyles, FontGilroy } from 'primitives';
import { CustomColors } from 'constants/colors.constants';
import { UserAccountInfo } from 'helpers/constants/user-account/userAccountInfo';
import Divider from 'components/atoms/divider.atom';
import { useEnhancedNavigation } from '@hooks/index';
import { RouteConstants } from 'routes/constants.routes';

const UserAccount = () => {
	const { navigate } = useEnhancedNavigation();

	const AccountOptionHandler = (index: number) => {
		switch (index) {
			case 0:
				navigate(RouteConstants.MyProfileScreenRoute);
				break;
			case 3:
				navigate(RouteConstants.CustomerSupportScreen);
				break;
			default:
				break;
		}
	};
	return (
		<View style={styles.container}>
			<Text style={styles.userNameText}>Hii, User</Text>
			<View style={styles.userInfoContainer}>
				{UserAccountInfo.map((UserInfo, index) => (
					<>
						<Pressable style={styles.userInfo} onPress={() => AccountOptionHandler(index)}>
							<Text>?</Text>
							<Text style={styles.AccountOption}>{UserInfo.label}</Text>
						</Pressable>
						{index < UserAccountInfo.length - 1 && (
							<Divider type="dotted" style={{ width: '80%', alignSelf: 'center' }} />
						)}
					</>
				))}
			</View>
		</View>
	);
};

export default UserAccount;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		margin: 20
	},
	userNameText: {
		marginTop: 60,
		fontSize: 20,
		fontFamily: FontGilroy.Bold,
		color: CustomColors.secondary
	},
	userInfoContainer: {
		marginTop: 30,
		borderRadius: 16,
		borderWidth: 0.5,
		borderColor: CustomColors.cart
	},
	userInfo: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingLeft: 5
	},
	AccountOption: {
		color: CustomColors.secondary,
		fontFamily: FontGilroy.SemiBold,
		paddingLeft: DefaultStyles.DefaultPadding + 25,
		paddingVertical: DefaultStyles.DefaultPadding + 10
	}
});
