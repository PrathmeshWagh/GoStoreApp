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
import { useDimensions, usePermissionHandlers, useTheme } from '@hooks/index';
import { DefaultStyles, FontGilroy } from '@primitives/index';
import { CustomButtom, ProductSlider, Rupee } from 'components/atoms';
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function ProductDetails({ Productitem, categories }: any) {
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
	console.log('in');

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
		const slug = categories.categoryData.slug;
		const id = Productitem.productId;

		navigate(RouteConstants.CategoriesScreenRoute, { name: slug, id: id });
	};

	const renderAssuredBBIcon = (iconName: 'buyBackPrice' | 'seamless' | 'greatSaving') => {
		switch (iconName) {
			case 'buyBackPrice':
				return <PreDetermineIcon width={35} height={35} />;
			case 'seamless':
				return <SeamlessIcon width={35} height={35} />;
			case 'greatSaving':
				return <GreatSavingIcon width={35} height={35} />;
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
		console.log('1');

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
									<Rupee money={12212} styles={{ fontSize: 25, fontFamily: FontGilroy.Regular }} />
									<Text
										style={{
											color: colors.primary,
											fontFamily: FontGilroy.Medium,
											fontSize: 12,
											marginLeft: 5
										}}
									>
										(37% off)
									</Text>
								</View>
								<View style={{ flexDirection: 'row' }}>
									<View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
										<Text style={{ fontFamily: FontGilroy.Medium, fontSize: 13 }}>MRP :</Text>
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
									<Rupee money={654} styles={{ fontSize: 25, fontFamily: FontGilroy.Regular }} />
									<Text
										style={{
											fontFamily: FontGilroy.Medium,
											fontSize: 10,
											marginLeft: 0,
											marginTop: 10
										}}
									>
										/Mo*
									</Text>
								</View>
								<View>
									<TouchableOpacity>
										<Text
											style={{
												color: colors.primary,
												textDecorationLine: 'underline',
												fontFamily: FontGilroy.Medium,
												fontSize: 13
											}}
										>
											EMI Options
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
								Buy this for as low as
								<Rupee money={12200} styles={{ fontSize: 20, fontFamily: FontGilroy.Regular }} />
							</Text>
							<Text style={{ fontFamily: FontGilroy.SemiBold, fontSize: 13 }}>With this Offer</Text>
						</View>
						<TouchableOpacity onPress={toggleExpanded}>
							<Icon
								name={expanded ? 'chevron-up' : 'chevron-down'}
								size={22}
								color={colors.secondary}
							/>
						</TouchableOpacity>
					</View>
					{expanded && (
						<Text style={[styles.expandedtext, { borderColor: colors.bordercolor }]}>
							10% Off on HDFC Credit Cards
						</Text>
					)}
					<View>
						<View style={[styles.space, { marginVertical: 10 }]}>
							<View style={{ flexDirection: 'row' }}>
								{/* <LottieView source={require('../path/to/animation.json')} autoPlay loop /> */}
								<Text style={{ fontFamily: FontGilroy.Bold, fontSize: 15 }}>Available Offers</Text>
							</View>
							<Pressable
								onPress={() => {
									console.log('press');
									refRBSheet.current.open();
								}}
							>
								<ViewMore width={45} height={18} />
								<Text style={{ color: colors.primary, fontSize: 13 }}>View all</Text>
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
							// closeOnDragDown={true}
							// closeOnPressMask={false}
							height={height / (3 / 2)}
							customStyles={{
								wrapper: {
									backgroundColor: 'rgba(0, 0, 0, 0.5)'
								}
							}}
						>
							<OffersModal
								bankOffersData={bankOffersData}
								noCostEmiOffers={noCostEmiOffers}
								onPress={() => {
									refRBSheet.current.close();
								}}
							/>
						</RBSheet>
					</View>
					<View>
						<View style={[styles.direction, { marginVertical: 8 }]}>
							<AvailablePlanIcon width={28} height={28} />
							<Text style={{ fontFamily: FontGilroy.Bold, fontSize: 15 }}>Available Plans</Text>
						</View>
						<View style={[styles.offer, { height: 200 }]}>
							<View
								style={{
									flexDirection: 'row',
									backgroundColor: colors.offerbg,
									borderRadius: 5,
									paddingHorizontal: 10,
									paddingVertical: 5,
									alignItems: 'center'
								}}
							>
								<BuyBackIcon width={24} height={24} />
								<Text style={[styles.text, { fontSize: 13 }]}>Buy Back Guarantee</Text>
								<Text style={styles.detailsText}>Details</Text>
							</View>
							<View style={styles.assueredFeature}>
								<View style={styles.services}>
									{assuredBBFeatures.map((feature) => (
										<View style={styles.description}>
											{renderAssuredBBIcon(feature.icon)}
											<Text style={[styles.text, { fontSize: 13, marginTop: 8 }]}>
												{feature.desc}
											</Text>
										</View>
									))}
								</View>
								<View style={[styles.space, { marginTop: 12, marginBottom: 8 }]}>
									<View style={styles.direction}>
										<Rupee money={1} styles={{ fontSize: 25, marginRight: 8 }} />
										<Rupee money={1199} styles={styles.mrp} />
										<Text style={{ fontSize: 12, color: colors.primary }}>(99% off)</Text>
									</View>
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
											height: DefaultStyles.DefaultButtonHeight - 10,
											borderRadius: DefaultStyles.DefaultButtonHeight - 40,
											backgroundColor: colors.primary
										}}
										textStyles={[styles.buttonText, { fontSize: 12 }]}
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
								{/* <KeyboardAwareScrollView> */}
								<View
									style={{ backgroundColor: colors.onSecondary, borderRadius: 15, elevation: 5 }}
								>
									<AssuredBuyBackModal
										onPress={() => {
											setModalVisible(false);
										}}
									/>
								</View>
								{/* </KeyboardAwareScrollView> */}
							</View>
						</Modal>
					</View>
					<View>
						<Text style={styles.exchangeText}>Exchange</Text>
						<Text style={{ fontSize: 12, marginBottom: 10, marginTop: 2 }}>
							Exchange any product and get benefits up to ₹14,000*
						</Text>
						<ExchangeProduct setIsExchangeVisible={setIsExchangeVisible} />
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
								<View style={[styles.exchangeDetails, { height: height / (3 / 2) }]}>
									<EXchangeDetails setIsExchangeVisible={setIsExchangeVisible} />
								</View>
							</View>
						</Modal>
					</View>
					<PincodeServicality />
					<View style={styles.direction}>
						<DeliverIcon width={28} height={28} />
						<Text style={{ fontFamily: FontGilroy.Medium, fontSize: 13 }}>
							Get it by <Text style={{ color: colors.primary }}>4 Oct - 6 Oct</Text> If ordered
							within the next {'\n'}
							<Text style={{ color: colors.primary }}>09</Text> hours
						</Text>
					</View>

					<View style={styles.direction}>
						<Text style={styles.dealerText}>Sold By:</Text>
						<Text style={{ fontFamily: FontGilroy.Medium }}>Blue stone limited</Text>
					</View>

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
						<View style={[styles.greenBox, { backgroundColor: colors.primary }]} />
						<View style={{ marginHorizontal: 8 }}>
							<LottieView source={require('@assets/bank-offers.json')} autoPlay loop />
						</View>
						<View>
							<Text style={{ fontSize: 12 }}>10% off in HDFC Card</Text>
						</View>
					</View>
					<View>
						<Text
							style={{
								fontFamily: FontGilroy.SemiBold,
								fontSize: 13
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
		width: '90%',
		alignSelf: 'center'
	},
	productName: {
		fontFamily: FontGilroy.Medium,
		fontSize: 15
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
		marginLeft: 10,
		fontSize: 13
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
		marginTop: 8,
		fontSize: 13,
		letterSpacing: 0.5
	},
	mrp: {
		fontSize: 13,
		fontFamily: FontGilroy.Medium,
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
		padding: 8,
		borderRadius: 5,
		marginVertical: 10,
		fontFamily: FontGilroy.Medium,
		fontSize: 13
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
		width: 20,
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
		fontFamily: FontGilroy.Medium,
		fontSize: 13,
		marginLeft: 5,
		borderWidth: 1,
		paddingHorizontal: 3,
		paddingVertical: 5,
		borderRadius: 5,
		textAlign: 'center'
	},
	assueredFeature: {
		flex: 1,
		justifyContent: 'space-between',
		paddingHorizontal: 6,
		paddingVertical: 3
	},
	detailsText: {
		marginLeft: 8,
		textDecorationLine: 'underline',
		fontFamily: FontGilroy.Medium,
		fontSize: 13
	},
	description: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	offerDetails: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '85%',
		borderRadius: 10
	},
	dealerText: {
		fontFamily: FontGilroy.Bold,
		fontSize: 15,
		marginVertical: 15,
		marginRight: 10
	},
	space: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 8
	},
	exchangeText: {
		fontFamily: FontGilroy.Bold,
		fontSize: 15,
		marginTop: 12
	}
});
