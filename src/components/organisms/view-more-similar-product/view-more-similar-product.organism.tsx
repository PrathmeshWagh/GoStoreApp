import { FlatList, StyleSheet, View, Text, Pressable, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import CategoryHooks from 'hooks/CategoryHooks';
import CategoryItemWithRatingText from 'components/atoms/category-item-with-ratingtext-atom';
import { DefaultStyles } from 'primitives';
import { useSelector } from 'react-redux';
import { RootState } from '@slices/store';
import { useGetProducts } from 'api/products/get-product-list';
import { useEnhancedNavigation } from '@hooks/index';
import { RouteConstants } from 'routes/constants.routes';

const ViewMoreSimilarProduct = () => {
	interface Category {
		id: number;
		name: string;
	}
	interface ProductData {
		data: ProductType[];
	}

	const { navigate } = useEnhancedNavigation();

	const [categoriesData, setCategoriesData] = useState<ProductData[]>([]);
	const [selectedCategory, setSelectedCategory] = useState<number>(0);
	const [currentPage, setCurrentPage] = useState<number>(1);
	// const location = useSelector((state: RootState) => state.location);

	const brand = 'OnePlus';
	const { data: getCategoriesApiResponse, isLoading: isCategoryLoading } =
		CategoryHooks.useGetCategoriesFromQueryString({ brand });

	const { mutate: getProducts, isLoading: isProductLoading, data: productData } = useGetProducts();

	useEffect(() => {
		if (productData) {
			setCategoriesData((prevData): any => [...prevData, ...productData.data]);
		}
	}, [productData]);

	const fetchData = async (page: number) => {
		const params = {
			brandArr: ['Samsung'],
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

	const allCategory: Category = {
		id: 0,
		name: 'All'
	};

	const mergedCategories: Category[] = [allCategory, ...(getCategoriesApiResponse?.data || [])];

	const handlerCategoryBox = (categoryId: number) => {
		setSelectedCategory(categoryId);
	};

	const renderCategoryBox = ({ item }: any) => {
		const isSelected = item.id === selectedCategory;
		return (
			<Pressable
				style={[styles.categoryBox, isSelected && styles.selectedCategoryBox]}
				onPress={() => handlerCategoryBox(item.id)}
			>
				<Text style={[styles.normalText, isSelected && styles.selectedText]}>{item.name}</Text>
			</Pressable>
		);
	};

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

	const Header = () => {
		return (
			<View style={{ marginBottom: 20 }}>
				<FlatList
					data={mergedCategories}
					renderItem={renderCategoryBox}
					horizontal={true}
					showsHorizontalScrollIndicator={false}
					keyExtractor={(item) => item.id.toString()}
				/>
			</View>
		);
	};

	return (
		<View style={styles.container}>
			<FlatList
				data={categoriesData}
				keyExtractor={(item) => item.id.toString()}
				renderItem={renderProduct}
				numColumns={2}
				ListHeaderComponent={Header}
				showsHorizontalScrollIndicator={false}
				onEndReached={handleEndReached}
				onEndReachedThreshold={0.1}
			/>
		</View>
	);
};

export default ViewMoreSimilarProduct;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: DefaultStyles.DefaultPadding - 8
	},
	categoryBox: {
		marginTop: 20,
		marginRight: 10,
		padding: DefaultStyles.DefaultPadding - 1,
		borderWidth: 0.5,
		borderRadius: 5
		// backgroundColor: 'green'
	},
	selectedCategoryBox: {
		backgroundColor: 'green'
	},
	normalText: {
		color: 'black'
	},
	selectedText: {
		color: 'white'
	}
});
