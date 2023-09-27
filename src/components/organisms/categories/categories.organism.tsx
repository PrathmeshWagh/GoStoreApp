import { FlatList, Text, StyleSheet, View, Image, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import Rupee from '../../atoms/rupee.atom';
import { FontGilroy, DefaultStyles } from '@primitives/index';
import { CustomColors } from '../../../constants/colors.constants';
import { useGetProducts } from 'api/products/get-product-list';
import { useSelector } from 'react-redux';
import { RootState } from '@slices/store';
import StarIcon from '@assets/icons/star.svg';

const Categories = () => {
	const [productData, setProductData] = useState<any[]>([]);

	const location = useSelector((state: RootState) => state.location);

	const { isLoading, mutate: getProducts, response, error } = useGetProducts();

	const fetchData = async () => {
		const params = {
			category: 'TELEVISIONS',
			categoryId: '6360eb1464cb95ecdd4ad8c8',
			priceFilter: {},
			filterObj: {},
			clusterId: 1,
			state: 'Karnataka',
			sort: 'recommendation_asc',
			pageSize: 24,
			page: 1
		};
		// getProducts({ params });
		useGetProducts({ params });
	};

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		if (response) {
			setProductData(response.data);
		}
	}, [response]);

	const btnPressed = () => {
		console.log('pressed');
	};

	const categoriesItem = ({ item }: any) => {
		return (
			<Pressable style={styles.item} onPress={btnPressed}>
				{/* {item.priority === 2000 && (
					<View
						style={[
							styles.bestsellerBox,
							{ backgroundColor: item.brand === 'Bestseller' ? 'orange' : 'blue' }
						]}
					>
						<Text style={styles.bestsellerText}>Bestseller</Text>
					</View>
				)} */}

				{item.rating && (
					<View style={styles.ratingBox}>
						<Text style={styles.ratingText}>{item.rating}</Text>
						<StarIcon width={12} height={12} />
					</View>
				)}

				<View style={[styles.imageContainer]}>
					<Image
						source={{ uri: item.primaryImgPath }}
						style={[styles.image]}
						resizeMode="contain"
					/>
				</View>

				<View style={styles.infoContainer}>
					<Text numberOfLines={2} style={[styles.title]}>
						{item.title}
					</Text>
					<Rupee money={item.storePrice} styles={[styles.price]} />
					<View style={[styles.mrpWrapper]}>
						<Rupee money={item.mrp} styles={[styles.mrp]} />
						<Text numberOfLines={2} style={[styles.discount, { color: CustomColors.primary }]}>
							{item.discount}% off
						</Text>
					</View>
				</View>
			</Pressable>
		);
	};

	return (
		<View style={styles.container}>
			{isLoading ? (
				<Text>Loading...</Text>
			) : (
				<FlatList
					data={productData}
					keyExtractor={(item): any => item.id}
					renderItem={categoriesItem}
					numColumns={2}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingBottom: DefaultStyles.DefaultPadding + 16,
		paddingTop: DefaultStyles.DefaultPadding,
		paddingHorizontal: 5
	},
	item: {
		flex: 1,
		margin: 8,
		borderColor: '#ccc',
		borderWidth: 1,
		height: 280,
		borderRadius: 20
	},
	bestsellerBox: {
		position: 'absolute',
		top: 0,
		left: 0,
		paddingHorizontal: 10,
		borderTopLeftRadius: 20,
		borderBottomRightRadius: 20,
		paddingVertical: 2
	},
	bestsellerText: {
		color: 'white',
		fontWeight: 'bold'
	},
	ratingBox: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		top: 0,
		right: 0,
		backgroundColor: CustomColors.primary,
		borderTopRightRadius: 20,
		borderBottomLeftRadius: 20,
		paddingHorizontal: 8,
		paddingVertical: 2
	},
	ratingText: {
		color: 'white',
		fontWeight: 'bold',
		paddingRight: 3
	},

	imageContainer: {
		marginHorizontal: 10,
		marginTop: 30,
		marginBottom: 20
	},
	image: {
		height: 120,
		width: '100%'
	},
	infoContainer: {
		flex: 1,
		paddingLeft: 15,
		paddingRight: 20,
		paddingVertical: 15,
		backgroundColor: '#E8E8E8',
		borderBottomRightRadius: 20,
		borderBottomLeftRadius: 20
	},
	title: {
		lineHeight: 20,
		fontFamily: FontGilroy.Bold
	},
	price: {
		lineHeight: 20,
		fontSize: 14
	},
	mrpWrapper: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	mrp: {
		color: '#AAB7B8',
		fontSize: 14,
		fontWeight: '400',
		textDecorationLine: 'line-through',
		lineHeight: 20
	},
	discount: {
		lineHeight: 20,
		fontWeight: '600',
		marginLeft: DefaultStyles.DefaultPadding - 8
	}
});

export default Categories;
