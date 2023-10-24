import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { CustomButtom } from 'components/atoms';
import { DefaultStyles } from 'primitives';
import { CustomColors } from 'constants/colors.constants';
import NoOrders from '@assets/icons/orders/no-orders.svg';
import { useEnhancedNavigation } from '@hooks/index';
import { RouteConstants } from 'routes/constants.routes';
import BasicCard from 'components/atoms/basic-card.atom';
import { useOrdersQuery } from 'api/orders/get-orders';

const MyOrder = () => {
	let page = '1';
	const { navigate } = useEnhancedNavigation();
	const { data, isLoading, isError } = useOrdersQuery(page);

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
			{data?.data?.length < 1 ? (
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
					{data?.data?.map((item, index: number) => (
						<BasicCard style={{ flexDirection: 'row' }} onPress={handlerOrder} key={index}>
							<View style={{ width: '30%', justifyContent: 'center' }}>
								<Image style={styles.orderimg} source={{ uri: item?.image }} resizeMode="contain" />
							</View>
							<View>
								<Text style={{ paddingBottom: DefaultStyles.DefaultPadding - 5 }}>
									{item?.displayName}
								</Text>
								<TouchableOpacity onPress={viewDetailsHandler}>
									<Text style={{ color: CustomColors.primary, fontSize: 10 }}>View Details</Text>
								</TouchableOpacity>
								<View style={{ justifyContent: 'flex-end' }}>
									<Text style={{ color: CustomColors.primary }}>{item?.statusToDisplay}</Text>
									<Text>{item?.orderDate}</Text>
								</View>
							</View>
						</BasicCard>
					))}
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
