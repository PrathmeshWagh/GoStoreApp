import {
	StyleSheet,
	Text,
	View,
	Image,
	ScrollView,
	TouchableOpacity,
	Pressable,
	TextInput,
	Modal
} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { useDimensions, usePermissionHandlers } from '@hooks/index';
import { DefaultStyles, FontGilroy } from '@primitives/index';
import { CustomButtom, ProductSlider, Rupee } from 'components/atoms';
import { useTheme } from '@hooks/index';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatureSection from 'components/molecules/product/feature-section';
import assuredBBFeatures from 'helpers/constants/product-abb/assuredBBFeatures';
import { useProductMutation } from 'api/products/get-product.api';
import Highlight from 'components/molecules/product/highlights';
import SpecsAndInstaltion from 'components/molecules/product/specs';
import BuyBackIcon from '@assets/icons/productDetails/assuredBB/buyback-guarantee.svg';
import PreDetermineIcon from '@assets/icons/productDetails/assuredBB/pre-determined-bb.svg';
import SeamlessIcon from '@assets/icons/productDetails/assuredBB/seamless-bb.svg';
import GreatSavingIcon from '@assets/icons/productDetails/assuredBB/great-savings.svg';
import AvailablePlanIcon from '@assets/icons/productDetails/assuredBB/available-plans.svg';
import StarIcon from '@assets/icons/productDetails/star.svg';
import ViewMore from '@assets/icons/view-icon.svg';
import InformationIcon from '@assets/icons/information-icon.svg';
import DeliverIcon from '@assets/icons/productDetails/delievery_green.svg';
import CarryIcon from '@assets/icons/productDetails/carry_bag.svg';
import CartIcon from '@assets/icons/productDetails/cart.svg';
import ReviewsRatings from 'components/organisms/product/review/review-rating';
import Brochure from 'components/organisms/brochure';
import ProductdetailsSlider from 'components/atoms/product-details-carousel.atom';
import SimilarProducts from 'components/molecules/Banner/SimilarProducts';
import AssuredBuyBackModal from 'components/organisms/product/assured-buyback/assured-buyback-modal';
import PincodeServicality from 'components/organisms/product/review/pincode-servicability';
import { useCheckAssuredBuyBack } from 'api/products/check-assured-buyback';
import ExchangeProduct from 'components/organisms/product/exchange-product/exchange-product';
import EXchangeDetails from 'components/organisms/product/exchange-product/exchange-details';
import OffersModal from 'components/organisms/BankOffers/AllBankOffers/OffersModal';
import { useBankOffers } from 'api/BankOffers';
import RBSheet from 'react-native-raw-bottom-sheet';
import OfferItem from 'components/molecules/product/offerItem';
import { useEnhancedNavigation } from '@hooks/index';
import { RouteConstants } from '@routes/constants.routes';
import LottieView from 'lottie-react-native';
import { useCouponsQuery } from 'api/coupons/get-coupons';

export default function ProductDetailsScreen({ route }: any) {
	const Productitem = route.params;
	console.log('product', Productitem);

	const { navigate } = useEnhancedNavigation();
	const { width, height } = useDimensions();
	const { colors } = useTheme();
	const refRBSheet = useRef();
	const {
		mutate: getProductPriceDetails,
		data: priceDetails,
		isLoading: priceDetailsLoading,
		isError: priceDetailsError,
		error
	} = useProductMutation();

	const { data: assuredBuyBackData, refetch: checkAssuredBuyBack } = useCheckAssuredBuyBack({
		productId: Productitem.productId,
		clusterId: 7
	});

	const { data: bankOffers, isLoading: isOffersLoading, isError } = useBankOffers(2, 1000000);

	const { data: platformOffersData } = useCouponsQuery();

	const [expanded, setExpanded] = useState<boolean>(false);
	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const [isExchangeVisible, setIsExchangeVisible] = useState<boolean>(false);
	const [bankOffersData, setBankOffersData] = useState([]);
	const [noCostEmiOffers, setNoCostEmiOffers] = useState([]);

	const toggleExpanded = () => {
		setExpanded(!expanded);
	};

	const handleViewMoreSimilarProduct = () => {
		navigate(RouteConstants.ViewMoreSimilarProductScreenRoute);
	};

	const handleViewMore = () => {
		const slug = 'TELEVISIONS';
		const id = Productitem.productId;

		navigate(RouteConstants.CategoriesScreenRoute, { name: slug, id: id });
	};

	const renderAssuredBBIcon = (iconName: 'buyBackPrice' | 'seamless' | 'greatSaving') => {
		switch (iconName) {
			case 'buyBackPrice':
				return <PreDetermineIcon width={30} height={30} />;
			case 'seamless':
				return <SeamlessIcon width={30} height={30} />;
			case 'greatSaving':
				return <GreatSavingIcon width={30} height={30} />;
			default:
				return <></>;
		}
	};

	useEffect(() => {
		if (priceDetails) {
			checkAssuredBuyBack();
		}
	}, [priceDetails]);

	useEffect(() => {
		const bankOffersData = bankOffers?.data?.filter((offer: any) => offer?.kind === 'INSTANT');
		const noCostEmiOffers = bankOffers?.data?.filter((offer: any) => offer?.kind === 'NO_COST_EMI');
		setBankOffersData(bankOffersData);
		setNoCostEmiOffers(noCostEmiOffers);
	}, [bankOffers]);

	useEffect(() => {
		const payload = {
			productId: Productitem.productId,
			clusterId: 7,
			supplierId: Productitem.supplierId
		};

		getProductPriceDetails(payload);
	}, []);

	return (
		<View style={styles.container}>
			<ScrollView>
				<ProductdetailsSlider />
				<View style={styles.productInfoContainer}>
					<View>
						<Text style={styles.productName}>
							Samsung 32 inch ( 80 cm ) LED HD Smart TV ( UA32T4340BKXXL )
						</Text>

						<View style={[styles.direction, { marginVertical: 10 }]}>
							<View
								style={[
									styles.direction,
									{ backgroundColor: colors.primary, padding: 1, borderRadius: 5 }
								]}
							>
								<Text style={styles.ratingText}>4</Text>
								<StarIcon width={12} height={12} style={{ marginRight: 5 }} />
							</View>
							<Text style={[styles.ratingLabel, { color: colors.primary }]}>
								Rated Across Ecommerce Platforms
							</Text>
						</View>
						<View style={styles.space}>
							<View>
								<View style={styles.direction}>
									<Rupee money={12212} styles={{ fontSize: 28 }} />
									<Text
										style={{
											color: colors.primary,
											fontFamily: FontGilroy.SemiBold,
											fontSize: 16,
											marginLeft: 5
										}}
									>
										(37% off )
									</Text>
								</View>
								<View style={{ flexDirection: 'row' }}>
									<View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
										<Text style={{ fontFamily: FontGilroy.Medium }}>MRP :</Text>
										<Rupee styles={styles.mrp} money={1200} />
									</View>
									<InformationIcon width={24} height={24} />
								</View>
							</View>

							<Text style={[styles.orText, { color: colors.primary, borderColor: colors.primary }]}>
								OR
							</Text>

							<View>
								<View style={styles.direction}>
									<Rupee money={654} styles={{ fontSize: 28 }} />
									<Text
										style={{
											color: colors.primary,
											fontFamily: FontGilroy.SemiBold,
											fontSize: 16,
											marginLeft: 5
										}}
									>
										/Mo
									</Text>
								</View>
								<View>
									<TouchableOpacity>
										<Text
											style={{
												color: colors.primary,
												textDecorationLine: 'underline',
												fontFamily: FontGilroy.Medium
											}}
										>
											EMI OPTION
										</Text>
									</TouchableOpacity>
								</View>
							</View>
						</View>
					</View>
					<FeatureSection />
					<View style={styles.space}>
						<View>
							<Text style={{ fontFamily: FontGilroy.SemiBold }}>
								Buy this for as low as <Rupee money={12200} styles={{ fontSize: 20 }} />
							</Text>
							<Text style={{ fontFamily: FontGilroy.SemiBold, fontSize: 16 }}>With this Offer</Text>
						</View>
						<TouchableOpacity onPress={toggleExpanded}>
							<Icon name={expanded ? 'chevron-up' : 'chevron-down'} size={25} color="#000" />
						</TouchableOpacity>
					</View>
					{expanded && <Text style={styles.expandedtext}>10% Off on HDFC Credit Cards </Text>}
					<View>
						<View style={styles.space}>
							<View style={{ flexDirection: 'row' }}>
								{/* <LottieView source={require('../path/to/animation.json')} autoPlay loop /> */}
								<Text>Available Offers</Text>
							</View>
							<Pressable
								onPress={() => {
									console.log('press');
									refRBSheet.current.open();
								}}
							>
								<ViewMore />
								<Text style={{ color: colors.primary }}>View all</Text>
							</Pressable>
						</View>
						<View style={styles.services}>
							<OfferItem
								title="Bank offer"
								description="10% off on Yes bank Credit Card EMI"
								onPress={() => {
									refRBSheet.current.open();
								}}
							/>
							<OfferItem
								title="Coupons"
								description="Use coupon code IPHONE15 and get up to the maximum"
								onPress={() => {
									// Handle the press event for this offer item
								}}
							/>
						</View>

						<RBSheet
							ref={refRBSheet}
							closeOnDragDown={true}
							closeOnPressMask={false}
							height={height / (3 / 2)}
							customStyles={{
								wrapper: {
									backgroundColor: 'rgba(0, 0, 0, 0.5)'
								}
							}}
						>
							<OffersModal bankOffersData={bankOffersData} noCostEmiOffers={noCostEmiOffers} />
						</RBSheet>
					</View>
					<View>
						<View style={[styles.direction, { marginVertical: 8 }]}>
							<AvailablePlanIcon width={28} height={28} />
							<Text style={{ fontFamily: FontGilroy.Bold }}>Available Plans</Text>
						</View>
						<View style={[styles.offer, { height: 200 }]}>
							<View
								style={{
									flexDirection: 'row',
									backgroundColor: colors.offerbg,
									borderRadius: 5,
									paddingHorizontal: 5,
									alignItems: 'center'
								}}
							>
								<BuyBackIcon width={24} height={24} />
								<Text style={styles.text}>Buy Back Guarantee</Text>
								<Text style={styles.detailsText}>Details</Text>
							</View>
							<View style={styles.assueredFeature}>
								<View style={styles.services}>
									{assuredBBFeatures.map((feature) => (
										<View style={styles.description}>
											{renderAssuredBBIcon(feature.icon)}
											<Text style={styles.text}>{feature.desc}</Text>
										</View>
									))}
								</View>
								<View style={[styles.space, { marginTop: 10 }]}>
									<Rupee money={1} styles={{ fontSize: 25 }} />
									<CustomButtom
										loading={false}
										onPress={() => {
											console.log('press');
											setModalVisible(true);
										}}
										mode="text"
										text="Add Plan"
										disabled={false}
										styles={{
											height: DefaultStyles.DefaultButtonHeight,
											borderRadius: DefaultStyles.DefaultButtonHeight - 40,
											backgroundColor: colors.primary
										}}
										textStyles={[styles.buttonText]}
									/>
								</View>
							</View>
						</View>
						<Modal
							visible={modalVisible}
							animationType="fade"
							transparent={true}
							onRequestClose={() => setModalVisible(false)}
						>
							<View style={styles.modalContainer}>
								<View style={{ backgroundColor: '#fff', borderRadius: 15, elevation: 5 }}>
									<AssuredBuyBackModal
										onPress={() => {
											setModalVisible(false);
										}}
									/>
								</View>
							</View>
						</Modal>
					</View>
					<View>
						<Text style={{ fontFamily: FontGilroy.SemiBold, fontSize: 17 }}>Exchange</Text>
						<Text>Exchange any product and get benefits up to ₹14,000*</Text>
						<ExchangeProduct setIsExchangeVisible={setIsExchangeVisible} />
						<View style={[styles.withBuyback, { borderColor: colors.primary }]}>
							<Text>Buy without Exchange</Text>
						</View>
						<Modal
							visible={isExchangeVisible}
							animationType="fade"
							transparent={true}
							onRequestClose={() => setModalVisible(false)}
						>
							<View
								style={{
									flex: 1,
									backgroundColor: 'rgba(0, 0, 0, 0.5)',
									justifyContent: 'center'
								}}
							>
								<View style={[styles.exchangeDetails, { height: height / 2 }]}>
									<EXchangeDetails setIsExchangeVisible={setIsExchangeVisible} />
								</View>
							</View>
						</Modal>
					</View>
					<PincodeServicality />
					<View style={styles.direction}>
						<DeliverIcon width={28} height={28} />
						<Text style={{ fontFamily: FontGilroy.Medium }}>
							Get it by <Text style={{ color: colors.primary }}>4 Oct - 6 Oct</Text> If ordered
							within the next {'\n'}
							<Text style={{ color: colors.primary }}>09</Text> hours
						</Text>
					</View>

					<Text style={styles.dealerText}>
						Sold By :<Text style={{ fontFamily: FontGilroy.Medium }}> BLUEZOO PRIVATE LIMITED</Text>
					</Text>

					<Highlight />
					<SpecsAndInstaltion />
					<ReviewsRatings />
					<Brochure />
					<SimilarProducts
						title="You may also like"
						filter={'sdfa'}
						link={'af'}
						onPress={handleViewMore}
					/>
					<SimilarProducts
						title="More for NU"
						filter={'sdfa'}
						link={'af'}
						onPress={handleViewMoreSimilarProduct}
					/>
				</View>
			</ScrollView>
			<View
				style={[
					styles.productInfoContainer,
					{ backgroundColor: colors.onSecondary, marginTop: 10 }
				]}
			>
				<View style={styles.offerContainer}>
					<View style={[styles.offerDetails, { backgroundColor: colors.tertiary }]}>
						<View style={[styles.greenBox, { backgroundColor: colors.primary }]}></View>
						<View style={{ marginHorizontal: 8 }}>
							<LottieView source={require('@assets/bank-offers.json')} autoPlay loop />
						</View>
						<View>
							<Text>10% off in HDFC Card</Text>
						</View>
					</View>
					<View>
						<Text
							style={{
								fontFamily: FontGilroy.SemiBold
							}}
						>
							Offer{'\n'}Details
						</Text>
					</View>
				</View>
				<View style={styles.buttonsContainer}>
					<CustomButtom
						loading={false}
						onPress={() => {}}
						mode="text"
						text="Add To Cart"
						disabled
						styles={[
							styles.button,
							{
								backgroundColor: colors.onSecondary,
								borderWidth: 1,
								borderColor: colors.primary
							}
						]}
						textStyles={[styles.buttonText, { color: colors.primary }]}
						icon={<CarryIcon width={24} height={24} />}
					/>

					<CustomButtom
						loading={false}
						mode="text"
						text="Buy Now"
						onPress={() => {}}
						disabled
						styles={[styles.button, { marginLeft: 10, backgroundColor: colors.primary }]}
						textStyles={[styles.buttonText, { color: colors.onSecondary }]}
						icon={<CarryIcon width={24} height={24} />}
					/>
				</View>
			</View>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFF'
	},

	productInfoContainer: {
		width: '92%',
		alignSelf: 'center'
	},
	productName: {
		fontFamily: FontGilroy.Medium,
		fontSize: 16
	},
	ratingContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 1,
		borderRadius: 5
	},
	ratingText: {
		color: '#FFFF',
		marginRight: 5,
		marginLeft: 4
	},
	ratingLabel: {
		fontFamily: FontGilroy.Medium,
		marginLeft: 10
	},
	buttonsContainer: {
		flexDirection: 'row',
		paddingBottom: 16
	},
	button: {
		height: DefaultStyles.DefaultButtonHeight,
		borderRadius: DefaultStyles.DefaultButtonHeight - 40,
		marginTop: 20,
		flex: 1
	},
	buttonText: {
		fontFamily: FontGilroy.SemiBold,
		marginTop: 8
	},
	mrp: {
		color: '#AAB7B8',
		fontSize: 14,
		fontWeight: '400',
		textDecorationLine: 'line-through',
		lineHeight: 20
	},
	services: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		gap: 10
	},
	text: {
		fontSize: 16,
		fontFamily: FontGilroy.Medium,
		textAlign: 'center'
	},
	offer: {
		flex: 1,
		height: 110,
		borderWidth: 1,
		borderRadius: 5,
		borderColor: '#e5e7eb'
	},
	expandedtext: {
		borderWidth: 1,
		padding: 10,
		borderRadius: 5,
		borderColor: '#e5e7eb',
		marginVertical: 10,
		fontFamily: FontGilroy.Medium
	},
	offerContainer: {
		borderRadius: 8,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	modalContainer: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		justifyContent: 'center',
		alignItems: 'center'
	},
	greenBox: {
		width: '8%',
		paddingVertical: 20,
		borderTopLeftRadius: 8,
		borderBottomLeftRadius: 8
	},
	direction: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	exchangeDetails: {
		backgroundColor: '#fff',
		borderRadius: 15,
		elevation: 5
	},
	orText: {
		fontFamily: FontGilroy.SemiBold,
		fontSize: 16,
		marginLeft: 5,
		borderWidth: 1,
		padding: 5,
		borderRadius: 5
	},
	assueredFeature: {
		flex: 1,
		justifyContent: 'space-between',
		paddingHorizontal: 6,
		paddingVertical: 3
	},
	withBuyback: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderWidth: 1,
		padding: 12,
		borderRadius: 10,
		marginVertical: 15
	},
	detailsText: {
		marginLeft: 8,
		textDecorationLine: 'underline',
		fontFamily: FontGilroy.Medium
	},
	description: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	offerDetails: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '80%'
	},
	dealerText: {
		fontFamily: FontGilroy.Bold,
		fontSize: 17,
		marginVertical: 20
	},
	space: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	}
});
