import {
	FlatList,
	StyleSheet,
	View,
	Text,
	Pressable,
	RefreshControl,
	ActivityIndicator,
	ScrollView
} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { FontGilroy, DefaultStyles } from '@primitives/index';
import { CustomColors } from '../../../constants/colors.constants';
import { useDimensions } from 'hooks';
import { useGetProducts } from 'api/products/get-product-list';
import { useSelector } from 'react-redux';
import { RootState } from '@slices/store';
import CategoryItemWithRatingText from '../../atoms/category-item-with-ratingtext-atom';
import { useEnhancedNavigation } from '@hooks/index';
import { RouteConstants } from 'routes/constants.routes';
import RBSheet from 'react-native-raw-bottom-sheet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { SORT_OPTIONS } from 'helpers';
import BrandFilter from '../Shop/brand-filters';
import PriceFilter from '../Shop/price-filters';
import Divider from 'components/atoms/divider.atom';
import { useFiltersMutation } from 'api/clp/use-filters';
import { getProductParams } from 'helpers/products';
import OtherFilters from '../Shop/other-filters';

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

const Categories = ({ categoryData }: any) => {
	const location = useSelector((state: RootState) => state.location);
	const { navigate } = useEnhancedNavigation();
	const refRBSheet = useRef<RBSheet>(null);
	const refRBSheetFilter = useRef<RBSheet>(null);
	const { height, width } = useDimensions();
	const { mutate: getProducts, isLoading, data: categories } = useGetProducts();

	const [categoriesData, setCategoriesData] = useState<Category[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [refreshing, setRefreshing] = useState(false);
	const [sort, setSelectedSort] = useState('recommendation_asc');
	const [expanded, setExpanded] = useState(false);
	// const [brandArr, setBrandArr] = useState([]);
	const [selectedBrand, setSelectedBrand] = useState([]);
	const [selectedOtherFilter, setSelectedOtherFilter] = useState({});
	const [resetAllFilter, setResetAllFilter] = useState(false);

	const {
		mutate: getFilters,
		data: filters,
		error: filtersError,
		isLoading: isFilterLoading
	} = useFiltersMutation();

	const rootKey = 'storeId';

	useEffect(() => {
		const params = {
			isKiosk: false
		};
		const productData = {
			category: categoryData.categoryData?.slug,
			categoryId: categoryData.categoryData?.id,
			priceFilter: {},
			filterObj: {},
			clusterId: 1,
			state: 'Karnataka',
			sort,
			pageSize: 24,
			page: 1
		};

		getFilters({ params, productData, rootKey: rootKey });
	}, [rootKey, location]);

	useEffect(() => {
		if (categories) {
			setCategoriesData((prevData) => [...prevData, ...categories.data]);
		}
	}, [categories]);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		// setCategoriesData([]);
		if (currentPage === 1) {
			fetchData(currentPage, sort);
		} else {
			setCurrentPage(1);
		}
		setRefreshing(false);
	}, [refreshing]);

	const fetchData = async (page: number, sort: string) => {
		let params = {
			category: categoryData.categoryData?.slug,
			categoryId: categoryData.categoryData?.id,
			priceFilter: {},
			filterObj: {},
			clusterId: 1,
			state: 'Karnataka',
			sort,
			pageSize: 24,
			page
		};
		if (selectedBrand.length) {
			params.brandArr = selectedBrand;
		}

		if (selectedOtherFilter && Object.keys(selectedOtherFilter).length) {
			params.filterObj = selectedOtherFilter;
		}

		getProducts({ params });
	};

	useEffect(() => {
		fetchData(currentPage, sort);
	}, [currentPage]);

	useEffect(() => {
		setCategoriesData([]);
		if (currentPage === 1) {
			fetchData(currentPage, sort);
		} else {
			setCurrentPage(1);
		}
	}, [sort]);

	useEffect(() => {
		setCategoriesData([]);
		if (currentPage === 1) {
			fetchData(currentPage, sort);
		} else {
			setCurrentPage(1);
		}
	}, [selectedBrand, selectedOtherFilter]);

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

	const handleSortSelect = (sortOptionId: string) => {
		setSelectedSort(sortOptionId);
	};

	const updateSelectedBrandFunc = (newSelectedBrand) => {
		setSelectedBrand(newSelectedBrand);
	};

	const updateOtherSelectedFilterFunc = (otherSelectedFilter) => {
		setSelectedOtherFilter(otherSelectedFilter);
	};

	const resetBtnHandler = () => {
		setResetAllFilter(!resetAllFilter);
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
								{SORT_OPTIONS.map((option, index) => (
									<Pressable
										key={option.value}
										style={[styles.info, index < SORT_OPTIONS.length - 1 && styles.borderBottom]}
										onPress={() => {
											handleSortSelect(option.value);
											refRBSheet.current?.close();
										}}
									>
										{sort === option.value ? (
											<Icon name="circle-slice-8" size={20} color={CustomColors.primary} />
										) : (
											<FontAwesome5 name={'circle'} size={20} color="black" />
										)}
										<Text
											style={[styles.optionText, sort === option.value && styles.selectedsortText]}
										>
											{option.name}
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
						<View style={{ flex: 1 }}>
							<View style={styles.sortbytextContainer}>
								<Pressable>
									<Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>Filters</Text>
								</Pressable>

								<Pressable onPress={resetBtnHandler}>
									<Text style={{ fontSize: 16 }}>Reset</Text>
								</Pressable>
							</View>

							<ScrollView style={styles.filtercontent}>
								<BrandFilter
									data={filters?.brandFilters}
									updateSelectedBrand={updateSelectedBrandFunc}
									resetFilter={resetAllFilter}
								/>
								<Divider type="dashed" style={{ width: '92%', alignSelf: 'center' }} />
								<PriceFilter />
								<Divider type="dashed" style={{ width: '92%', alignSelf: 'center' }} />
								<OtherFilters
									filters={filters?.productFilters}
									updateOtherSelectedFilter={updateOtherSelectedFilterFunc}
									resetFilter={resetAllFilter}
								/>
							</ScrollView>

							<View>
								<View style={styles.closeAndApplyContainer}>
									<Pressable
										style={styles.sortbtn}
										onPress={() => refRBSheetFilter.current?.close()}
									>
										<Text
											style={{ fontSize: 18, fontWeight: 'bold', color: CustomColors.secondary }}
										>
											Close
										</Text>
									</Pressable>

									<Pressable
										style={styles.filterbtn}
										onPress={() => refRBSheetFilter.current?.close()}
									>
										<Text style={{ fontSize: 18, fontWeight: 'bold', color: CustomColors.primary }}>
											Apply
										</Text>
									</Pressable>
								</View>
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
		width: '48%',
		borderRightWidth: 1,
		borderRightColor: '#E8E8E8',
		justifyContent: 'center',
		alignItems: 'center'
	},
	filterbtn: {
		width: '48%',
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
		marginBottom: 1,
		padding: DefaultStyles.DefaultPadding
	},
	filtercontent: {
		flex: 1,
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
	}
});

export default Categories;
