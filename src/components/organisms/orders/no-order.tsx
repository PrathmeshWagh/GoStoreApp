import { Text, View, StyleSheet } from 'react-native';
import { CustomButtom } from 'components/atoms';
import { DefaultStyles } from 'primitives';
import { CustomColors } from 'constants/colors.constants';
import NoOrders from '@assets/icons/orders/no-orders.svg';
import { useEnhancedNavigation } from '@hooks/index';
import { RouteConstants } from 'routes/constants.routes';

const NoOrder = () => {
	const { navigate } = useEnhancedNavigation();

	const shopNowBtnHandler = () => {
		navigate(RouteConstants.HomeScreenRoute);
	};
	return (
		<View style={styles.container}>
			<View style={styles.contentContainer}>
				<Text
					style={{
						fontSize: 18,
						color: CustomColors.secondary,
						textAlign: 'center',
						paddingVertical: DefaultStyles.DefaultPadding
					}}
				>
					You haven’t placed an order yet!
				</Text>

				<Text
					style={{
						fontSize: 15,
						color: CustomColors.secondary,
						paddingVertical: DefaultStyles.DefaultPadding,
						textAlign: 'center'
					}}
				>
					Explore our product ranges
				</Text>
				<View style={{ alignItems: 'center' }}>
					<NoOrders />
				</View>

				<View style={styles.btnContainer}>
					<CustomButtom text="Shop Now" styles={styles.btn} onPress={shopNowBtnHandler} />
				</View>
			</View>
		</View>
	);
};

export default NoOrder;
const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	contentContainer: {
		marginVertical: 40,
		paddingHorizontal: DefaultStyles.DefaultPadding + 10
	},
	btnContainer: {
		alignItems: 'center',
		paddingVertical: DefaultStyles.DefaultPadding
	},
	btn: {
		width: '80%',
		height: DefaultStyles.DefaultHeight - 15,
		borderRadius: 15
	}
});
