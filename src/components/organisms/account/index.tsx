import { View, Text, StyleSheet, Pressable } from 'react-native';
import React, { useState } from 'react';
import { DefaultStyles, FontGilroy } from 'primitives';
import { CustomColors } from 'constants/colors.constants';
import { UserAccountInfo } from 'helpers/constants/user-account/userAccountInfo';
import Divider from 'components/atoms/divider.atom';
import { useEnhancedNavigation } from '@hooks/index';
import { RouteConstants } from 'routes/constants.routes';
import LogoutModal from 'components/atoms/logout-modal.atom';
import CarryIcon from '@assets/icons/productDetails/carry_bag.svg';
import Account from '@assets/icons/sliderbar/my-profile.svg';
import CustomerSupport from '@assets/icons/sliderbar/customer-support.svg';
import Logout from '@assets/icons/sliderbar/logout.svg';

const UserAccount = () => {
	const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
	const { navigate } = useEnhancedNavigation();

	const logoutHandler = () => {
		setIsLogoutModalVisible(!isLogoutModalVisible);
	};

	const renderIcon = (
		icon: 'My Profile' | 'My Orders' | 'Referral' | 'Customer Support' | 'Logout'
	) => {
		switch (icon) {
			case 'My Profile':
				return <Account width={30} height={30} />;

			case 'My Orders':
				return <CarryIcon width={30} height={30} />;

			case 'Referral':
				return <CarryIcon width={30} height={30} />;

			case 'Customer Support':
				return <CustomerSupport width={30} height={30} />;

			case 'Logout':
				return <Logout width={30} height={30} />;
		}
	};

	const AccountOptionHandler = (index: number) => {
		switch (index) {
			case 0:
				navigate(RouteConstants.MyProfileScreenRoute);
				break;
			case 1:
				navigate(RouteConstants.MyOrderScreenRoute);
				break;

			case 3:
				navigate(RouteConstants.CustomerSupportScreenRoute);
				break;
			case 4:
				logoutHandler();
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
							<View style={{ width: '8%' }}>{renderIcon(UserInfo.label)}</View>

							<Text style={styles.AccountOption}>{UserInfo.label}</Text>
						</Pressable>
						{index < UserAccountInfo.length - 1 && (
							<Divider type="dotted" style={{ marginHorizontal: 40 }} />
						)}
					</>
				))}
			</View>
			{isLogoutModalVisible && (
				<LogoutModal
					isLogoutModalVisible={isLogoutModalVisible}
					setIsLogoutModalVisible={() => setIsLogoutModalVisible(false)}
				/>
			)}
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
		fontFamily: FontGilroy.Medium,
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
		width: '90%',
		color: CustomColors.secondary,
		fontFamily: FontGilroy.Medium,
		paddingLeft: DefaultStyles.DefaultPadding,
		paddingVertical: DefaultStyles.DefaultPadding + 10
	}
});
