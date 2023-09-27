import React from 'react';
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { useDispatch } from 'react-redux';

import { useCategories } from '@api/categories/use-categories.api';
import { ComponentWrapper, FastImages } from '@atoms/index';
import { useEnhancedNavigation } from '@hooks/index';
import { RouteConstants } from '@routes/constants.routes';
import { AppDispatch } from '@slices/store';
import { updateUrl } from 'slices/webview.slice';
import Config from 'react-native-config';

const Categories = () => {
	const { data, isLoading, isError, refetch } = useCategories();
	const categoryData = data?.data || [];
	const { navigate } = useEnhancedNavigation();
	const dispatch = useDispatch<AppDispatch>();

	const onPress = (item: Category) => {
		const url = `/category/${item.slug}?categoryId=${item.id}&sort_by=recommendation_asc`;
		dispatch(updateUrl({ url: `${Config.BASE_WEBVIEW_URL}${url}` }));
		// console.log('cat', {item.slug , item.id});

		navigate(RouteConstants.CategoriesRoute, { name: item.slug, id: item.slug });
	};

	const renderItem = ({ item }: { item: Category }) => {
		return (
			<TouchableOpacity style={[styles.container]} onPress={() => onPress(item)}>
				<FastImages url={item.image} style={styles.image} />
				<Text variant="titleSmall">{item.displayName}</Text>
			</TouchableOpacity>
		);
	};

	return (
		<ComponentWrapper
			loading={isLoading}
			error={isError}
			loadingText="Fetching categories..."
			errText="Unable to fetch categories."
			refetch={refetch}
		>
			<FlatList
				data={categoryData}
				renderItem={renderItem}
				horizontal={true}
				pagingEnabled={false}
				showsHorizontalScrollIndicator={false}
				keyExtractor={(item) => `${item.id}`}
				style={[styles.flatlist]}
			/>
		</ComponentWrapper>
	);
};

const styles = StyleSheet.create({
	flatlist: {
		paddingVertical: 12
	},
	container: {
		marginHorizontal: 8,
		alignItems: 'center'
	},
	image: {
		width: 60,
		height: 60
	}
});

export default Categories;
