import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ApiEndpoints } from 'api/utils/api-endpoints.api';
import Config from 'react-native-config';
import Images from 'assets/Images';
import { useDimensions, usePermissionHandlers } from '@hooks/index';
import { DefaultStyles, FontGilroy } from '@primitives/index';
import CustomFontVariants from 'constants';
import { CustomButtom, Rupee } from 'components/atoms';
import { useTheme } from '@hooks/index';
import CarryIcon from '@assets/icons/productDetails/carry_bag.svg';
import StarIcon from '@assets/icons/productDetails/star.svg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function CategoriesScreen({ route }) {
	const { name } = route.params;
	const { width, height } = useDimensions();
	const { colors } = useTheme();

	const [expanded, setExpanded] = useState(false);

	const toggleExpanded = () => {
		setExpanded(!expanded);
	};

	return (
		<View style={styles.container}>
			<ScrollView>
				<Image
					source={Images.LOGIN_BANNER}
					style={{ width: width, height: height * 0.4, resizeMode: 'cover' }}
				/>
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
									<View style={{ flexDirection: 'row' }}>
										<Text>MRP :</Text>
										<Rupee styles={styles.mrp} money={1200} />
									</View>
									<Text>?</Text>
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
									<Rupee money={12212} styles={{ fontSize: 28 }} />
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
										<Text>EMI OPTION</Text>
									</TouchableOpacity>
								</View>
							</View>
						</View>
					</View>
					<View style={styles.services}>
						<View style={styles.box}>
							<Icon name="brightness-percent" size={20} color={colors.primary} />
							<Text style={styles.text}>Free Delivery</Text>
						</View>
						<View style={styles.box}>
							<Icon name="brightness-percent" size={20} color={colors.primary} />
							<Text style={styles.text}>7-Day Easy Return</Text>
						</View>
						<View style={styles.box}>
							<Icon name="brightness-percent" size={20} color={colors.primary} />
							<Text style={styles.text}>Free Installation</Text>
						</View>
					</View>

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
					{expanded && (
						<Text style={{ borderWidth: 1, padding: 10 }}>
							10% Off on HDFC Credit Cards on all NU Porducts
						</Text>
					)}
				</View>
			</ScrollView>
			<View style={styles.buttonsContainer}>
				<CustomButtom
					loading={false}
					onPress={() => {}}
					mode="text"
					text="Add To Cart"
					disabled
					styles={[styles.button]}
					textStyles={[styles.buttonText]}
				>
					<CarryIcon width={24} height={24} />
				</CustomButtom>
				<CustomButtom
					loading={false}
					mode="text"
					text="Buy Now"
					onPress={() => {}}
					disabled
					styles={[styles.button, { marginLeft: 10 }]}
					textStyles={[styles.buttonText, { color: colors.onSecondary }]}
				>
					<CarryIcon width={24} height={24} />
				</CustomButtom>
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
		padding: 16,
		backgroundColor: '#FFF'
	},
	button: {
		height: DefaultStyles.DefaultButtonHeight,
		borderRadius: DefaultStyles.DefaultButtonHeight - 40,
		marginTop: 20,
		backgroundColor: 'gray',
		flex: 1
	},
	buttonText: {
		fontFamily: FontGilroy.Bold,
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
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	box: {
		flex: 1,
		height: 100,
		backgroundColor: '#FFF',
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: 'gray',
		marginHorizontal: 5
	},
	text: {
		fontSize: 16,
		fontFamily: FontGilroy.Medium,
		textAlign: 'center'
	}
});
