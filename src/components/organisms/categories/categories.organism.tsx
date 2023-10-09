import {
	FlatList,
	StyleSheet,
	View,
	Text,
	Pressable,
	RefreshControl,
	ActivityIndicator
} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { FontGilroy, DefaultStyles } from '@primitives/index';
import { CustomColors } from '../../../constants/colors.constants';
import { useGetProducts } from 'api/products/get-product-list';
// import { useSelector } from 'react-redux';
// import { RootState } from '@slices/store';
import CategoryItemWithRatingText from '../../atoms/category-item-with-ratingtext-atom';
import RBSheet from 'react-native-raw-bottom-sheet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

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
const sortOptions = [
	{ id: 'recommendation', label: 'Recommendation' },
	{ id: 'discHighToLow', label: 'Discount: High To Low' },
	{ id: 'pricelowToHigh', label: 'Price: Low To High' },
	{ id: 'priceHighToLow', label: 'Price: High To Low' }
];

const Categories = ({ categoryData }: any) => {
	// const location = useSelector((state: RootState) => state.location);
	const refRBSheet = useRef<RBSheet>(null);
	const { mutate: getProducts, isLoading, data: categories } = useGetProducts();

	const [categoriesData, setCategoriesData] = useState<Category[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [refreshing, setRefreshing] = useState(false);
	const [selectedSort, setSelectedSort] = useState('recommendation');
	const [open, setOpen] = useState(false);

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
			// category: categoryData.categoryData.slug,
			// categoryId: categoryData.categoryData.id,
			category: categoryData.slug,
			categoryId: categoryData.id,
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

	const btnPressedHandler = () => {
		console.log('pressed');
	};

	const categoriesItem = ({ item }: any) => {
		return <CategoryItemWithRatingText item={item} onPress={btnPressedHandler} />;
	};

	const handleEndReached = ({ distanceFromEnd }: any) => {
		if (distanceFromEnd <= 0) return;
		setCurrentPage(currentPage + 1);
	};

	const handleSortSelect = (sortOptionId) => {
		setSelectedSort(sortOptionId);
	};
	const onClosePress = () => {
		if (!open) {
			refRBSheet.current.open();
		} else {
			refRBSheet.current.close();
		}
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

			<View style={styles.sortAndFilterContainer}>
				<Pressable style={styles.sortbtn} onPress={() => refRBSheet.current.open()}>
					<Text style={{ fontSize: 18, fontWeight: 'bold', color: CustomColors.secondary }}>
						Sort
					</Text>
				</Pressable>

				<Pressable style={styles.filterbtn}>
					<Text style={{ fontSize: 18, fontWeight: 'bold', color: CustomColors.secondary }}>
						Filter
					</Text>
				</Pressable>

				<RBSheet
					ref={refRBSheet}
					onOpen={() => setOpen(true)}
					onClose={() => setOpen(false)}
					customStyles={{
						wrapper: {
							backgroundColor: 'rgba(0, 0, 0, 0.5)'
						},
						// draggableIcon: {
						// 	backgroundColor: '#000'
						// },
						container: {
							width: '95%',
							borderRadius: 10,
							alignSelf: 'center'
						}
					}}
				>
					<View>
						<View style={styles.sortbytextContainer}>
							<Pressable>
								<Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>Sort By</Text>
							</Pressable>

							<Pressable onPress={onClosePress}>
								<Icon name="close" size={20} color={'black'} />
							</Pressable>
						</View>

						<View style={styles.content}>
							{sortOptions.map((option, index) => (
								<Pressable
									key={option.id}
									style={[styles.info, index < sortOptions.length - 1 && styles.borderBottom]}
									onPress={() => handleSortSelect(option.id)}
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
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// paddingBottom: DefaultStyles.DefaultPadding + 16,
		paddingTop: DefaultStyles.DefaultPadding,
		paddingHorizontal: DefaultStyles.DefaultPadding - 8
	},
	sortAndFilterContainer: {
		flexDirection: 'row',
		borderTopColor: 'black',
		borderTopWidth: 0.4,
		height: DefaultStyles.DefaultHeight
	},
	sortbtn: {
		flex: 1,
		borderRightWidth: 1,
		borderBottomColor: '#E8E8E8',
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
		backgroundColor: '#E7E7E7',
		paddingHorizontal: DefaultStyles.DefaultPadding
	},
	info: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 10
	},
	optionText: {
		alignItems: 'center',
		justifyContent: 'center',
		fontSize: 20,
		color: 'black',
		paddingLeft: 5
	},
	content: {
		marginBottom: 20,
		padding: DefaultStyles.DefaultPadding - 4
	},
	selectedsortText: {
		fontFamily: FontGilroy.SemiBold
	},
	borderBottom: {
		borderBottomWidth: 1,
		borderBottomColor: '#E8E8E8'
	}
});

export default Categories;
