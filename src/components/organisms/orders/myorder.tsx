import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { CustomButtom } from 'components/atoms';
import { DefaultStyles } from 'primitives';
import { CustomColors } from 'constants/colors.constants';
import NoOrders from '@assets/icons/orders/no-orders.svg';
import { useEnhancedNavigation } from '@hooks/index';
import { RouteConstants } from 'routes/constants.routes';
import BasicCard from 'components/atoms/basic-card.atom';

const MyOrder = () => {
	const { navigate } = useEnhancedNavigation();
	let order = 1;

	const shopNowBtnHandler = () => {
		navigate(RouteConstants.HomeScreenRoute);
	};

	const handlerOrder = () => {
		console.log('Log My Order');
	};

	const viewDetailsHandler = () => {
		console.log('view details');
	};

	return (
		<View style={styles.container}>
			{order < 0 ? (
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
			) : (
				<View style={styles.orderContainer}>
					<View style={styles.headerText}>
						<Text>Showing orders from </Text>
						<Text style={{ color: CustomColors.secondary, fontWeight: 'bold' }}>Last 1 year</Text>
					</View>
					<BasicCard style={{ flexDirection: 'row' }} onPress={handlerOrder}>
						<View style={{ width: '30%' }}>
							<Image
								style={styles.orderimg}
								source={{
									uri: 'https://arzooo-static-prod.s3.ap-south-1.amazonaws.com/images/products/81663/83afc/8166383afc111657b030dc89979dfea41fdde884237613314a103d8831a4e2cc_01.jpg'
								}}
								resizeMode="contain"
							/>
						</View>
						<View>
							<Text style={{ paddingBottom: DefaultStyles.DefaultPadding - 5 }}>
								Sony 43 Inch Full HD Smart TV
							</Text>
							<TouchableOpacity onPress={viewDetailsHandler}>
								<Text style={{ color: CustomColors.primary, fontSize: 10 }}>View Details</Text>
							</TouchableOpacity>
							<View style={{ justifyContent: 'flex-end' }}>
								<Text style={{ color: CustomColors.primary }}>Order Cancelled</Text>
								<Text>21-Oct-2021, 06:23 PM</Text>
							</View>
						</View>
					</BasicCard>
				</View>
			)}
		</View>
	);
};

export default MyOrder;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: DefaultStyles.DefaultPadding
	},
	contentContainer: {
		marginVertical: 40,
		paddingHorizontal: 10
	},
	btnContainer: {
		alignItems: 'center',
		paddingVertical: DefaultStyles.DefaultPadding
	},
	btn: {
		width: '80%',
		height: DefaultStyles.DefaultHeight - 15,
		borderRadius: 15
	},
	orderContainer: {},
	headerText: {
		flexDirection: 'row',
		marginBottom: 15
	},
	orderimg: {
		height: 50,
		width: '100%'
	}
});
