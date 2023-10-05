import {
	FlatList,
	StyleSheet,
	View,
	Pressable,
	RefreshControl,
	ActivityIndicator
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { FontGilroy, DefaultStyles } from '@primitives/index';
import { CustomColors } from '../../../constants/colors.constants';
import { useGetProducts } from 'api/products/get-product-list';
// import { useSelector } from 'react-redux';
// import { RootState } from '@slices/store';
import CategoryItemWithRatingText from '../../atoms/category-item-with-ratingtext-atom';

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
	// const location = useSelector((state: RootState) => state.location);

	const { mutate: getProducts, isLoading, data: categories } = useGetProducts();

	const [categoriesData, setCategoriesData] = useState<Category[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	// const [refreshing, setRefreshing] = useState(false);

	useEffect(() => {
		if (categories) {
			setCategoriesData((prevData): any => [...prevData, ...categories.data]);
		}
	}, [categories]);

	// const onRefresh = React.useCallback(() => {
	// 	setRefreshing(true);
	// 	// fetchData(currentPage);
	// 	setRefreshing(false);
	// }, [refreshing]);

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
		if (distanceFromEnd < 0) return;
		setCurrentPage(currentPage + 1);
	};

	return (
		<View style={styles.container}>
			{/* {isLoading ? (
				<ActivityIndicator size="large" color="#0000ff" />
			) : (
				<FlatList
					data={categoriesData}
					keyExtractor={(item) => item.id}
					renderItem={categoriesItem}
					numColumns={2}
					onEndReached={handleEndReached}
					onEndReachedThreshold={0.1}
					// refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
				/>
			)} */}

			<FlatList
				data={categoriesData}
				keyExtractor={(item): any => item.id}
				renderItem={categoriesItem}
				numColumns={2}
				onEndReached={handleEndReached}
				onEndReachedThreshold={0.1}
				// refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingBottom: DefaultStyles.DefaultPadding + 16,
		paddingTop: DefaultStyles.DefaultPadding,
		paddingHorizontal: DefaultStyles.DefaultPadding - 8
	}
});

export default Categories;
