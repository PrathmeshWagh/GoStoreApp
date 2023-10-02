import {
	StyleSheet,
	Text,
	View,
	Image,
	ScrollView,
	TouchableOpacity,
	Pressable,
	TextInput
} from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ApiEndpoints } from 'api/utils/api-endpoints.api';
import Config from 'react-native-config';
import Images from 'assets/Images';
import { useDimensions, usePermissionHandlers } from '@hooks/index';
import { DefaultStyles, FontGilroy } from '@primitives/index';
import { CustomButtom, ProductSlider, Rupee } from 'components/atoms';
import { useTheme } from '@hooks/index';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatureSection from 'components/molecules/product/feature-section';
import assuredBBFeatures from 'helpers/constants/product-abb/assuredBBFeatures';
import { CustomSvgImage } from 'components/atoms/svg.atom';
import { useProductMutation } from 'api/products/get-product.api';
import Highlight from 'components/molecules/product/highlights';
import SpecsAndInstaltion from 'components/molecules/product/specs';
import BuyBackIcon from '@assets/icons/productDetails/assuredBB/buyback-guarantee.svg';
import AvailablePlanIcon from '@assets/icons/productDetails/assuredBB/available-plans.svg';
import StarIcon from '@assets/icons/productDetails/star.svg';
import ViewMore from '@assets/icons/view-icon.svg';
import InformationIcon from '@assets/icons/information-icon.svg';
import DeliverIcon from '@assets/icons/productDetails/delievery_green.svg';
import CarryIcon from '@assets/icons/productDetails/carry_bag.svg';
import ReviewsRatings from 'components/organisms/product/review/review-rating';
import Brochure from 'components/organisms/brochure';
import ProductdetailsSlider from 'components/atoms/product-details-carousel.atom';
import SimilarProducts from 'components/molecules/Banner/SimilarProducts';

export default function CategoriesScreen({ route }) {
	const { name } = route.params;
	const { width, height } = useDimensions();
	const { colors } = useTheme();
	const {
		mutate: getProductPriceDetails,
		data: priceDetails,
		isLoading: priceDetailsLoading,
		isError: priceDetailsError,
		error
	} = useProductMutation();

	const [expanded, setExpanded] = useState(false);

	const toggleExpanded = () => {
		setExpanded(!expanded);
	};

	useEffect(() => {
		const payload = {
			productId: '6360eec564cb95ecdd4b7a99',
			clusterId: 7,
			supplierId: 24075
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

						<View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
							<View
								style={{
									flexDirection: 'row',
									alignItems: 'center',
									backgroundColor: colors.primary,
									padding: 1,
									borderRadius: 5
								}}
							>
								<Text style={styles.ratingText}>4</Text>
								<StarIcon width={12} height={12} style={{ marginRight: 5 }} />
							</View>
							<Text style={[styles.ratingLabel, { color: colors.primary }]}>
								Rated Across Ecommerce Platforms
							</Text>
						</View>
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'space-between'
							}}
						>
							<View>
								<View style={{ flexDirection: 'row', alignItems: 'center' }}>
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

							<Text
								style={{
									fontFamily: FontGilroy.SemiBold,
									fontSize: 16,
									marginLeft: 5,
									borderWidth: 1,
									padding: 5,
									borderRadius: 5,
									color: colors.primary,
									borderColor: colors.primary
								}}
							>
								OR
							</Text>

							<View>
								<View style={{ flexDirection: 'row', alignItems: 'center' }}>
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

					<View
						style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
					>
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
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center'
							}}
						>
							<View style={{ flexDirection: 'row' }}>
								<Text>Icon</Text>
								<Text>Available Offers</Text>
							</View>
							<Pressable
								onPress={() => {
									console.log('press');
								}}
							>
								<ViewMore />
								<Text style={{ color: colors.primary }}>View all</Text>
							</Pressable>
						</View>
						<View style={styles.services}>
							<View style={styles.offer}>
								<View
									style={{
										flexDirection: 'row',
										backgroundColor: '#EFF5F8',
										borderRadius: 5,
										paddingHorizontal: 5
									}}
								>
									<Icon name="brightness-percent" size={20} color={colors.primary} />
									<Text style={styles.text}>Bank offer</Text>
								</View>
								<View
									style={{
										flex: 1,
										justifyContent: 'space-between',
										paddingHorizontal: 6,
										paddingVertical: 3
									}}
								>
									<Text>10 % off on Yes bank Creadit Card EMI</Text>
									<Text style={{ textDecorationLine: 'underline' }}>9 offer</Text>
								</View>
							</View>
							<View style={styles.offer}>
								<View
									style={{
										flexDirection: 'row',
										backgroundColor: '#EFF5F8',
										borderRadius: 5,
										paddingHorizontal: 5
									}}
								>
									<Icon name="brightness-percent" size={20} color={colors.primary} />
									<Text style={styles.text}>Coupons</Text>
								</View>
								<View
									style={{
										flex: 1,
										justifyContent: 'space-between',
										paddingHorizontal: 6,
										paddingVertical: 3
									}}
								>
									<Text>Use coupon code IPHONE15 and get upto maximum</Text>
									<Text style={{ textDecorationLine: 'underline' }}>9 offer</Text>
								</View>
							</View>
						</View>
					</View>
					<View>
						<View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 8 }}>
							<AvailablePlanIcon width={28} height={28} />
							<Text style={{ fontFamily: FontGilroy.Bold }}>Available Plans</Text>
						</View>
						<View style={[styles.offer, { height: 200 }]}>
							<View
								style={{
									flexDirection: 'row',
									backgroundColor: '#EFF5F8',
									borderRadius: 5,
									paddingHorizontal: 5,
									alignItems: 'center'
								}}
							>
								<BuyBackIcon width={24} height={24} />
								<Text style={styles.text}>Buy Back Guarantee</Text>
								<Text
									style={{
										marginLeft: 8,
										textDecorationLine: 'underline',
										fontFamily: FontGilroy.Medium
									}}
								>
									Details
								</Text>
							</View>
							<View
								style={{
									flex: 1,
									justifyContent: 'space-between',
									paddingHorizontal: 6,
									paddingVertical: 3
								}}
							>
								{/* <View style={styles.services}>
									<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
										<Icon name="brightness-percent" size={20} color={colors.primary} />
										<Text style={styles.text}>Pre-determined Assured Buyback Price</Text>
									</View>
									<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
										<Icon name="brightness-percent" size={20} color={colors.primary} />
										<Text style={styles.text}>Seamless Buyback Process</Text>
									</View>
									<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
										<Icon name="brightness-percent" size={20} color={colors.primary} />
										<Text style={styles.text}>Great Savings to Upgrade to New Device</Text>
									</View>
								</View> */}
								<View style={styles.services}>
									{assuredBBFeatures.map((feature) => (
										<View
											key={feature.image}
											style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
										>
											<CustomSvgImage source={feature.image} width={42} height={42} />
											<Text style={styles.text}>{feature.desc}</Text>
										</View>
									))}
								</View>
								<View
									style={{
										flexDirection: 'row',
										justifyContent: 'space-between',
										alignItems: 'center',
										marginTop: 10
									}}
								>
									<Rupee money={1} styles={{ fontSize: 25 }} />
									<CustomButtom
										loading={false}
										onPress={() => {}}
										mode="text"
										text="Add Plan"
										disabled
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
					</View>
					<View>
						<Text style={{ fontFamily: FontGilroy.SemiBold, fontSize: 17 }}>Exchange</Text>
						<Text>Exchange any product and get benefits up to ₹14,000*</Text>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								borderWidth: 1,
								borderColor: colors.primary,
								padding: 12,
								borderRadius: 10
							}}
						>
							<Text>Buy with Exchange</Text>
							<Text>
								save upto <Rupee money={14000} />
							</Text>
						</View>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								borderWidth: 1,
								borderColor: colors.primary,
								padding: 12,
								borderRadius: 10,
								marginVertical: 15
							}}
						>
							<Text>Buy without Exchange</Text>
						</View>
					</View>
					<View>
						<Text style={{ fontFamily: FontGilroy.SemiBold, fontSize: 17 }}>Deliver To</Text>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center',
								borderWidth: 1,
								borderColor: colors.primary,
								borderRadius: 10,
								marginVertical: 15
							}}
						>
							<TextInput placeholder="Enter PIN code" keyboardType="numeric" style={{ flex: 1 }} />
							<CustomButtom
								loading={false}
								onPress={() => {}}
								mode="text"
								text="Check"
								disabled
								styles={{
									height: DefaultStyles.DefaultButtonHeight,
									borderRadius: DefaultStyles.DefaultButtonHeight - 40,
									backgroundColor: colors.primary
								}}
								textStyles={[styles.buttonText]}
							/>
						</View>
					</View>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<DeliverIcon width={28} height={28} />
						<Text style={{ fontFamily: FontGilroy.Medium }}>
							Get it by <Text style={{ color: colors.primary }}>4 Oct - 6 Oct</Text> If ordered
							within the next {'\n'}
							<Text style={{ color: colors.primary }}>09</Text> hours
						</Text>
					</View>
					<View style={{ marginVertical: 20 }}>
						<Text style={{ fontFamily: FontGilroy.Bold, fontSize: 17 }}>
							Sold By :
							<Text style={{ fontFamily: FontGilroy.Medium }}> BLUEZOO PRIVATE LIMITED</Text>
						</Text>
					</View>
					<View style={{ borderBottomWidth: 1, paddingBottom: 10, marginVertical: 15 }}>
						<Highlight />
					</View>
					<View style={{ paddingBottom: 10, marginBottom: 15 }}>
						<SpecsAndInstaltion />
					</View>
					<ReviewsRatings />
					<Brochure />
					<SimilarProducts title="You may also like" filter={'sdfa'} link={'af'} />
					<SimilarProducts title="More for NU" filter={'sdfa'} link={'af'} />
				</View>
			</ScrollView>
			<View
				style={[
					styles.productInfoContainer,
					{ backgroundColor: colors.onSecondary, marginTop: 10 }
				]}
			>
				<View style={styles.offerContainer}>
					<View
						style={{
							backgroundColor: colors.tertiary,
							width: '80%',
							padding: 10,
							borderRadius: 10
						}}
					>
						<Text>10% off in HDFC Card</Text>
					</View>
					<View style={{ alignItems: 'center' }}>
						<Text>Offer </Text>
						<Text>Details</Text>
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
		alignItems: 'center'
	}
});
