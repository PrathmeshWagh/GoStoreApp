import { Text, View, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { CustomButtom } from 'components/atoms';
import { DefaultStyles } from 'primitives';
import { CustomColors } from 'constants/colors.constants';
import NoOrders from '@assets/icons/orders/no-orders.svg';
import { useEnhancedNavigation } from '@hooks/index';
import { RouteConstants } from 'routes/constants.routes';
import BasicCard from 'components/atoms/basic-card.atom';
import { useOrdersQuery } from 'api/orders/get-orders';

const MyOrder = () => {
	const orderData = [
		{
			orderDate: '21-Oct-2021, 06:23 PM',
			displayName: 'Sony 43 inch Full HD Smart TV ( KDL-43W6600 )',
			image:
				'https://arzooo-static-prod.s3.ap-south-1.amazonaws.com/images/products/81663/83afc/8166383afc111657b030dc89979dfea41fdde884237613314a103d8831a4e2cc_01.jpg',
			statusToDisplay: 'Order Cancelled'
		}
	];
	let page = '1';
	const { navigate } = useEnhancedNavigation();
	const { data, isLoading, isError } = useOrdersQuery(page);

	const shopNowBtnHandler = () => {
		navigate(RouteConstants.HomeScreenRoute);
	};

	const handlerOrder = () => {
		console.log('Log My Order');
	};

	const viewDetailsHandler = () => {
		console.log('view details');
	};

	const emptyData = () => {
		return (
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
		);
	};

	const renderItem = ({ item }) => {
		return (
			<View style={styles.orderContainer}>
				<View style={styles.headerText}>
					<Text>Showing orders from </Text>
					<Text style={{ color: CustomColors.secondary, fontWeight: 'bold' }}>Last 1 year</Text>
				</View>
				<BasicCard onPress={handlerOrder}>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Image style={styles.orderimg} source={{ uri: item?.image }} resizeMode="contain" />
						<View style={{ flex: 3 }}>
							<View style={{ marginLeft: DefaultStyles.DefaultPadding - 6 }}>
								<Text
									style={{ paddingBottom: DefaultStyles.DefaultPadding - 5 }}
									numberOfLines={1}
									ellipsizeMode="tail"
								>
									{item.displayName}
								</Text>
								<TouchableOpacity onPress={viewDetailsHandler}>
									<Text style={{ color: CustomColors.primary, fontSize: 10 }}>View Details</Text>
								</TouchableOpacity>
							</View>
							<View style={{ alignItems: 'flex-end' }}>
								<Text style={{ color: CustomColors.primary }}>{item.statusToDisplay}</Text>
								<Text>{item.orderDate}</Text>
							</View>
						</View>
					</View>
				</BasicCard>
			</View>
		);
	};

	return (
		<View style={styles.container}>
			<FlatList
				data={orderData}
				keyExtractor={(item, index) => index.toString()}
				renderItem={renderItem}
				ListEmptyComponent={emptyData}
			/>
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
		marginVertical: 15
	},
	orderimg: {
		height: 50,
		width: '20%'
	}
});
