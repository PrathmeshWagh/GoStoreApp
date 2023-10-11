import { FlatList, StyleSheet, View, Text, Pressable, RefreshControl } from 'react-native';
import React, { useState, useEffect, useMemo } from 'react';
import CategoryHooks from 'hooks/CategoryHooks';
import CategoryItemWithRatingText from 'components/atoms/category-item-with-ratingtext-atom';
import { DefaultStyles, FontGilroy } from 'primitives';
// import { useSelector } from 'react-redux';
// import { RootState } from '@slices/store';
import { useGetProducts } from 'api/products/get-product-list';
import { useEnhancedNavigation } from '@hooks/index';
import { RouteConstants } from 'routes/constants.routes';
import { CustomColors } from 'constants/colors.constants';
import { categories } from 'api/categories/use-categories.api';

interface Category {
	id: string;
	name: string;
}
interface ProductData {
	data: ProductType[];
}

const ViewMoreSimilarProduct = () => {
	interface Category {
		id: string;
		name: string;
	}
	interface ProductData {
		data: ProductType[];
	}

	const { navigate } = useEnhancedNavigation();
	const [productsData, setProductsData] = useState<ProductData[]>([]);
	const [selectedCategoryId, setSelectedCategoryId] = useState<string>('0');
	const [selectedCategoryName, setSelectedCategoryName] = useState<string>('');
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [refreshing, setRefreshing] = useState(false);
	// const location = useSelector((state: RootState) => state.location);

	const brand = 'Samsung';
	const { data: getCategoriesApiResponse, isLoading: isCategoryBoxLoading } =
		CategoryHooks.useGetCategoriesFromQueryString({ brand });

	const { mutate: getProducts, isLoading: isProductLoading, data: productData } = useGetProducts();

	useEffect(() => {
		if (productData) {
			setProductsData((prevData): any => [...prevData, ...productData.data]);
		}
	}, [productData]);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);

		const categoryIdToRefresh = selectedCategoryId;
		const categoryNameToRefresh = selectedCategoryName;

		setProductsData([]);

		if (currentPage === 1) {
			fetchData(currentPage, categoryIdToRefresh, categoryNameToRefresh);
		} else {
			setCurrentPage(1);
		}

		setRefreshing(false);
	}, [refreshing, selectedCategoryId, selectedCategoryName]);

	const fetchData = async (page: number, categoryId?: string, name?: string) => {
		let params = {
			...(categoryId && { categoryId }),
			...(name && { category: name }),
			brandArr: ['Samsung'],
			priceFilter: {},
			filterObj: {},
			clusterId: 1,
			state: 'Karnataka',
			sort: 'recommendation_asc',
			pageSize: 24,
			page
		};
		if (categoryId === '0') {
			params = {
				brandArr: ['Samsung'],
				priceFilter: {},
				filterObj: {},
				clusterId: 1,
				state: 'Karnataka',
				sort: 'recommendation_asc',
				pageSize: 24,
				page
			};
		}

		getProducts({ params });
	};
	useEffect(() => {
		fetchData(currentPage, selectedCategoryId, selectedCategoryName);
	}, [currentPage, selectedCategoryId, selectedCategoryName]);

	// useEffect(() => {
	// 	console.log('scroll to index');
	// 	ref.current?.scrollToIndex({
	// 		index: 0,
	// 		viewPosition: 0.5
	// 	});
	// }, []);

	const allCategory: Category = {
		id: '0',
		name: 'All'
	};

	const mergedCategories: Category[] = [allCategory, ...(getCategoriesApiResponse?.data || [])];

	const handlerCategoryBox = (categoryId: string, name: string) => {
		setProductsData([]); // Make products data empty when categorybox change
		setSelectedCategoryId(categoryId);
		setSelectedCategoryName(name);
		setCurrentPage(1);
	};

	const renderCategoryBox = useMemo(() => {
		return ({ item }: any) => {
			const isSelected = item.id === selectedCategoryId;
			return (
				<Pressable
					style={[styles.categoryBox, isSelected && styles.selectedCategoryBox]}
					onPress={() => handlerCategoryBox(item.id, item.name)}
				>
					<Text style={[styles.normalText, isSelected && styles.selectedText]}>{item.name}</Text>
				</Pressable>
			);
		};
	}, [selectedCategoryId]);

	const btnPressedHandler = (item: any) => {
		navigate(RouteConstants.ProductdeatilsScreenRoute, { item: item });
	};

	const renderProduct = ({ item }: any) => {
		return <CategoryItemWithRatingText item={item} onBtnPress={btnPressedHandler} />;
	};

	const handleEndReached = ({ distanceFromEnd }: any) => {
		if (distanceFromEnd <= 0) return;
		setCurrentPage(currentPage + 1);
	};

	// const Header = () => {
	// 	return (
	// 		<View style={{ marginBottom: 20 }}>
	// 			{isCategoryBoxLoading ? (
	// 				<Text>Loading...</Text>
	// 			) : (
	// 				<FlatList
	// 					ref={ref}
	// 					data={mergedCategories}
	// 					renderItem={renderCategoryBox}
	// 					horizontal={true}
	// 					showsHorizontalScrollIndicator={false}
	// 					keyExtractor={(item) => item.id}
	// 				/>
	// 			)}
	// 		</View>
	// 	);
	// };

	return (
		<View style={styles.container}>
			<View style={{ marginBottom: 10 }}>
				{isCategoryBoxLoading ? (
					<Text>Loading...</Text>
				) : (
					<FlatList
						data={mergedCategories}
						renderItem={renderCategoryBox}
						horizontal={true}
						showsHorizontalScrollIndicator={false}
						keyExtractor={(item) => item.id}
					/>
				)}
			</View>
			<FlatList
				data={productsData}
				keyExtractor={(item) => item.id}
				renderItem={renderProduct}
				numColumns={2}
				// ListHeaderComponent={Header}
				showsHorizontalScrollIndicator={false}
				onEndReached={handleEndReached}
				onEndReachedThreshold={0.7}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
			/>
		</View>
	);
};

export default ViewMoreSimilarProduct;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: DefaultStyles.DefaultPadding - 8,
		paddingBottom: DefaultStyles.DefaultPadding + 16,
		backgroundColor: CustomColors.onSecondary
	},
	categoryBox: {
		marginVertical: 12,
		// marginRight: 10,
		marginHorizontal: 5,
		padding: DefaultStyles.DefaultPadding - 3,
		borderRadius: 5,
		shadowColor: '#171717',
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.2,
		shadowRadius: 3,
		elevation: 5,
		backgroundColor: CustomColors.onSecondary
	},
	selectedCategoryBox: {
		backgroundColor: CustomColors.primary
	},
	normalText: {
		color: CustomColors.secondary,
		fontFamily: FontGilroy.Medium
	},
	selectedText: {
		color: CustomColors.onSecondary,
		fontFamily: FontGilroy.Medium
	}
});
