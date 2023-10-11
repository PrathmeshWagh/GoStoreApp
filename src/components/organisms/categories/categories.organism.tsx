import {
	FlatList,
	StyleSheet,
	View,
	Text,
	Pressable,
	RefreshControl,
	ActivityIndicator,
	TextInput,
	Modal
} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { FontGilroy, DefaultStyles } from '@primitives/index';
import { CustomColors } from '../../../constants/colors.constants';
import { useDimensions } from 'hooks';
import { useGetProducts } from 'api/products/get-product-list';
// import { useSelector } from 'react-redux';
// import { RootState } from '@slices/store';
import CategoryItemWithRatingText from '../../atoms/category-item-with-ratingtext-atom';
import { useEnhancedNavigation } from '@hooks/index';
import { RouteConstants } from 'routes/constants.routes';
import RBSheet from 'react-native-raw-bottom-sheet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckBox from 'react-native-check-box';
import Slider from '@react-native-community/slider';
import DropdownBox from 'components/atoms/dropdownBox';
import PriceModal from 'components/atoms/priceModal';

interface Category {
	id?: number;
	productId?: string;
	model?: string;
	gostorAsn?: string;
	title?: string;
	description?: string;
	mrp?: number;
	priority?: number;
	brand?: string;
	parentCategory?: string;
	category?: string;
	primaryImgPath?: string;
	rating?: number;
	ratingCount?: number;
	storePrice?: number;
	quantity?: number;
	supplierId?: number;
	discount?: number;
}

interface PriceData {
	id: number;
	label: string;
}
const sortOptions = [
	{ id: 'recommendation', label: 'Recommendation' },
	{ id: 'discHighToLow', label: 'Discount: High To Low' },
	{ id: 'pricelowToHigh', label: 'Price: Low To High' },
	{ id: 'priceHighToLow', label: 'Price: High To Low' }
];
const filterOptions = [
	{ id: 'recommendation', label: 'Brands' },
	{ id: 'discHighToLow', label: 'Price' },
	{ id: 'pricelowToHighSmart', label: 'Smart TV' },
	{ id: 'priceHighToLowSSS', label: 'Display Size' }
];

const brandsData = [
	{ id: 0, label: 'Samsung' },
	{ id: 1, label: 'Sony' },
	{ id: 2, label: 'LG' },
	{ id: 3, label: 'Onida' }
];

const Categories = ({ categoryData }: any) => {
	// const location = useSelector((state: RootState) => state.location);
	const { navigate } = useEnhancedNavigation();
	const refRBSheet = useRef<RBSheet>(null);
	const refRBSheetFilter = useRef<RBSheet>(null);
	const { height, width } = useDimensions();
	const { mutate: getProducts, isLoading, data: categories } = useGetProducts();
	const [categoriesData, setCategoriesData] = useState<Category[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [refreshing, setRefreshing] = useState(false);
	const [selectedSort, setSelectedSort] = useState('recommendation');
	const [selectedFilter, setSelectedFilter] = useState([]);
	const [isCheckedArray, setIsCheckedArray] = useState(brandsData.map(() => false));
	const [isMinModalVisible, setIsMinModalVisible] = useState(false);
	const [isMaxModalVisible, setIsMaxModalVisible] = useState(false);
	const [minPriceData, setMinPriceData] = useState<PriceData[]>([]);
	const [maxPriceData, setMaxPriceData] = useState<PriceData[]>([]);

	useEffect(() => {
		if (categories) {
			setCategoriesData((prevData) => [...prevData, ...categories.data]);
		}
	}, [categories]);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		setCategoriesData([]);
		if (currentPage === 1) {
			fetchData(currentPage);
		} else {
			setCurrentPage(1);
		}
		setRefreshing(false);
	}, [refreshing]);

	const fetchData = async (page: number) => {
		const params = {
			category: categoryData.categoryData.slug,
			categoryId: categoryData.categoryData.id,
			priceFilter: {},
			filterObj: {},
			clusterId: 1,
			state: 'Karnataka',
			sort: 'recommendation_asc',
			pageSize: 24,
			page
		};

		getProducts({ params });
	};

	useEffect(() => {
		fetchData(currentPage);
	}, [currentPage]);

	const btnPressedHandler = (item: any) => {
		navigate(RouteConstants.ProductdeatilsScreenRoute, { item: item, categories: categoryData });
	};

	const categoriesItem = ({ item }: any) => {
		return <CategoryItemWithRatingText item={item} onBtnPress={btnPressedHandler} />;
	};

	const handleEndReached = ({ distanceFromEnd }: any) => {
		if (distanceFromEnd <= 0) return;
		setCurrentPage(currentPage + 1);
	};

	// const handleSortSelect = (sortOptionId) => {
	// 	setSelectedSort(sortOptionId);
	// };

	const handleFilterSelect = (optionId) => {
		if (selectedFilter.includes(optionId)) {
			setSelectedFilter(selectedFilter.filter((id: string | number) => id !== optionId));
		} else {
			setSelectedFilter([...selectedFilter, optionId]);
		}
	};

	const handleCheckBoxClick = (index: number) => {
		const newIsCheckedArray = [...isCheckedArray];
		newIsCheckedArray[index] = !newIsCheckedArray[index];
		setIsCheckedArray(newIsCheckedArray);
	};

	const openMinPriceModal = () => {
		setMinPriceData([
			{ id: 1, label: 'Min price' },
			{ id: 2, label: '10000' },
			{ id: 3, label: '20000' },
			{ id: 4, label: '30000' },
			{ id: 5, label: '40000' }
		]);
		setIsMinModalVisible(true);
	};

	const openMaxPriceModal = () => {
		setMaxPriceData([
			{ id: 1, label: '50000' },
			{ id: 2, label: '60000' },
			{ id: 3, label: '70000' },
			{ id: 4, label: '80000' },
			{ id: 5, label: '90000' }
		]);
		setIsMaxModalVisible(true);
	};

	return (
		<>
			<View style={styles.container}>
				<FlatList
					data={categoriesData}
					keyExtractor={(item): any => item.id}
					renderItem={categoriesItem}
					numColumns={2}
					onEndReached={handleEndReached}
					onEndReachedThreshold={0.7}
					refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
					ListFooterComponent={() => {
						return isLoading ? <ActivityIndicator /> : <></>;
					}}
				/>
			</View>

			<View style={{ overflow: 'hidden', paddingTop: 5 }}>
				<View style={styles.sortAndFilterContainer}>
					<Pressable style={styles.sortbtn} onPress={() => refRBSheet.current?.open()}>
						<Text style={{ fontSize: 17, fontWeight: '600', color: CustomColors.secondary }}>
							Sort
						</Text>
					</Pressable>

					<Pressable style={styles.filterbtn} onPress={() => refRBSheetFilter.current?.open()}>
						<Text style={{ fontSize: 17, fontWeight: '600', color: CustomColors.secondary }}>
							Filter
						</Text>
					</Pressable>

					<RBSheet
						ref={refRBSheet}
						height={height / 2.5}
						customStyles={{
							wrapper: {
								backgroundColor: 'rgba(0, 0, 0, 0.5)'
							},
							container: {
								backgroundColor: '#F2F6FC',
								width: '95%',
								borderRadius: 10,
								alignSelf: 'center'
							}
						}}
					>
						<View>
							<View style={styles.sortbytextContainer}>
								<Pressable>
									<Text style={{ fontSize: 16, fontWeight: '500', color: 'black' }}>Sort By</Text>
								</Pressable>

								<Pressable onPress={() => refRBSheet.current?.close()}>
									<Icon name="close" size={20} color={'black'} />
								</Pressable>
							</View>

							<View style={styles.content}>
								{sortOptions.map((option, index) => (
									<Pressable
										key={option.id}
										style={[styles.info, index < sortOptions.length - 1 && styles.borderBottom]}
										onPress={() => {
											refRBSheet.current?.close();
										}}
									>
										{selectedSort === option.id ? (
											<Icon name="circle-slice-8" size={20} color={CustomColors.primary} />
										) : (
											<FontAwesome5 name={'circle'} size={20} color="black" />
										)}
										<Text
											style={[
												styles.optionText,
												selectedSort === option.id && styles.selectedsortText
											]}
										>
											{option.label}
										</Text>
									</Pressable>
								))}
							</View>
						</View>
					</RBSheet>

					<RBSheet
						ref={refRBSheetFilter}
						height={height / 1.1}
						customStyles={{
							wrapper: {
								backgroundColor: 'rgba(0, 0, 0, 0.5)'
							},

							container: {
								width: '95%',
								borderRadius: 10,
								alignSelf: 'center'
							}
						}}
					>
						<View style={{ flex: 1, justifyContent: 'space-between' }}>
							<View>
								<View style={styles.sortbytextContainer}>
									<Pressable>
										<Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>
											Filters
										</Text>
									</Pressable>

									<Pressable>
										<Text style={{ fontSize: 16 }}>Reset</Text>
									</Pressable>
								</View>

								<View style={styles.content}>
									{filterOptions.map((option, index) => (
										<View
											key={option.id}
											style={index < sortOptions.length - 1 && styles.borderBottom}
										>
											<Pressable
												style={[styles.filterinfo]}
												onPress={() => handleFilterSelect(option.id)}
											>
												<Text
													style={[
														styles.optionText,
														selectedFilter === option.id && styles.selectedsortText
													]}
												>
													{option.label}
												</Text>
												<Icon name="chevron-down" size={25} />
											</Pressable>
											{selectedFilter.includes(option.id) && (
												<View>
													<View
														style={{
															flexDirection: 'row',
															alignItems: 'center'
														}}
													>
														<TextInput placeholder="Search Brands" style={styles.textinput} />
														<MaterialCommunityIcons
															name="magnify"
															size={30}
															color={CustomColors.primary}
														/>
													</View>
													<View style={{ marginTop: 10 }}>
														{brandsData.map((brand, index) => (
															<View key={index}>
																<CheckBox
																	style={{ paddingTop: 10 }}
																	onClick={() => handleCheckBoxClick(index)}
																	isChecked={isCheckedArray[index]}
																	rightText={brand.label}
																	rightTextStyle={styles.brandText}
																	checkedCheckBoxColor={CustomColors.primary}
																	uncheckedCheckBoxColor={CustomColors.grey}
																/>
															</View>
														))}
													</View>
													<Slider
														style={{ width: '100%', height: 40 }}
														minimumValue={0}
														maximumValue={1}
														minimumTrackTintColor={CustomColors.primary}
														maximumTrackTintColor={CustomColors.grey}
													/>
													<View
														style={{
															flexDirection: 'row',
															justifyContent: 'space-between',
															paddingBottom: DefaultStyles.DefaultPadding
														}}
													>
														<DropdownBox
															style={styles.dropdownstyle}
															title={'Min'}
															onBoxPress={openMinPriceModal}
														/>
														<Modal
															animationType="fade"
															transparent={true}
															visible={isMinModalVisible}
															// onRequestClose={onClose}
														>
															<View style={styles.centeredView}>
																<PriceModal
																	setModalVisible={() => setIsMinModalVisible(false)}
																	priceData={minPriceData}
																/>
															</View>
														</Modal>

														<DropdownBox
															style={styles.dropdownstyle}
															title={50000}
															onBoxPress={openMaxPriceModal}
														/>
														<Modal
															animationType="fade"
															transparent={true}
															visible={isMaxModalVisible}
															// onRequestClose={onClose}
														>
															<View style={styles.centeredView}>
																<PriceModal
																	setModalVisible={() => setIsMaxModalVisible(false)}
																	priceData={maxPriceData}
																/>
															</View>
														</Modal>
													</View>
												</View>
											)}
										</View>
									))}
								</View>
							</View>

							<View style={styles.closeAndApplyContainer}>
								<Pressable style={styles.sortbtn} onPress={() => refRBSheetFilter.current?.close()}>
									<Text style={{ fontSize: 18, fontWeight: 'bold', color: CustomColors.secondary }}>
										Close
									</Text>
								</Pressable>

								<Pressable style={styles.filterbtn}>
									<Text style={{ fontSize: 18, fontWeight: 'bold', color: CustomColors.primary }}>
										Apply
									</Text>
								</Pressable>
							</View>
						</View>
					</RBSheet>
				</View>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 20,
		paddingHorizontal: DefaultStyles.DefaultPadding - 8,
		backgroundColor: CustomColors.onSecondary
	},
	sortAndFilterContainer: {
		flexDirection: 'row',
		height: DefaultStyles.DefaultHeight,
		backgroundColor: '#fff',
		shadowColor: '#000',
		shadowOffset: { width: 1, height: -1 },
		shadowOpacity: 0.4,
		shadowRadius: 3,
		elevation: 5
	},
	sortbtn: {
		flex: 1,
		borderRightWidth: 1,
		borderRightColor: '#E8E8E8',
		justifyContent: 'center',
		alignItems: 'center'
	},
	filterbtn: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	sortbytextContainer: {
		paddingVertical: DefaultStyles.DefaultPadding,
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: '#ECF0F3',
		paddingHorizontal: DefaultStyles.DefaultPadding
	},
	info: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 13
	},
	optionText: {
		alignItems: 'center',
		justifyContent: 'center',
		fontSize: 17,
		color: CustomColors.secondary,
		paddingLeft: 5
	},
	content: {
		marginBottom: 20,
		padding: DefaultStyles.DefaultPadding
	},
	selectedsortText: {
		fontFamily: FontGilroy.SemiBold
	},
	borderBottom: {
		borderBottomWidth: 1,
		borderBottomColor: '#E8E8E8'
	},
	closeAndApplyContainer: {
		flexDirection: 'row',
		borderTopColor: 'black',
		borderTopWidth: 0.4,
		height: DefaultStyles.DefaultHeight
	},
	filterinfo: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 10
	},
	brandText: {
		color: CustomColors.secondary,
		fontSize: 15,
		fontFamily: FontGilroy.Medium
	},
	textinput: {
		paddingLeft: 10,
		color: CustomColors.secondary,
		borderBottomWidth: 0.5,
		borderBottomColor: CustomColors.textGrey1,
		width: '80%'
	},
	dropdownstyle: {
		width: '42%',
		// paddingVertical: 5,
		borderWidth: 1,
		borderColor: CustomColors.primary,
		borderRadius: 5
	},
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)' // Semi-transparent black background
	}
});

export default Categories;
