import { FlatList, Text, StyleSheet, View, Image, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import Rupee from '../../atoms/rupee.atom';
import { DefaultStyles } from '@primitives/index';
import { CustomColors } from '../../../constants/colors.constants';
import { icon } from 'constants/icon.constants';
import { useGetProducts } from 'api/products/get-product-list';
import { useSelector } from 'react-redux';
import { RootState } from '@slices/store';

interface CategoryProps {
	id: number;
	title?: string;
	rating?: string;
	desc: string;
	price: any;
	mrp: any;
	discount: number;
	image: any;
	ratingimg: any;
	// url: string;
	// rootKey: string;
}

/*
const CategoriesData: CategoryProps[] = [
	{
		id: 1,
		title: 'Bestseller',
		rating: '4',
		desc: 'Samsung 32 inch LED HD Smart TV (UA32T4340BXXL)',
		image:
			'https://arzooo-static-prod.s3.ap-south-1.amazonaws.com/images/products/83dae/f53c2/83daef53c2eff3b63f2c54507b2ae8aece12dd004a9bf5ec2c5306e05850c2d6_01.jpg',
		ratingimg: require('../../../assets/images/star.png'),
		price: '13,780',
		mrp: '19,900',
		discount: 30
	},
	{
		id: 2,
		rating: '4.7',
		image:
			'https://static.arzooo.com/images/products/d95a4/0f3ec/d95a40f3ece87335852d948bfc279ccc3b7c5663c394eb57e1bc1b1e1b77db0a_00.jpg',
		ratingimg: require('../../../assets/images/star.png'),
		desc: 'Nu 55 inch Ultra HD (4k) Smart TV (LED55UWA1)',
		price: '31,499',
		mrp: '59,999',
		discount: 47
	},
	{
		id: 3,
		title: 'Trending',
		rating: '4.7',
		image:
			'https://static.arzooo.com/images/products/b63ff/a9faa/b63ffa9faa2a4dbcf728857aa6f5ce3686dd7abc5c056cf7f1a14db12ee016f9_00.jpg',
		ratingimg: require('../../../assets/images/star.png'),
		desc: 'Nu 32 inch LED HD (4k) Ready Smart TV (LED32UWA1)',
		price: '10,999',
		mrp: '24,999',
		discount: 40
	},
	{
		id: 4,
		image:
			'https://arzooo-static-prod.s3.ap-south-1.amazonaws.com/images/products/cb423/163cf/cb423163cf7b6b3f27b81b478b0f9b7c4e5905b7ad0029c5f6d1179221d3c807_00.jpg',
		ratingimg: require('../../../assets/images/star.png'),
		desc: 'OnePlus 32 inch LED HD Ready Smart TV ( 32Y1 )',
		price: '11,700',
		mrp: '15,499',
		discount: 20
	},
	{
		id: 5,
		rating: '4.3',
		image:
			'https://static.arzooo.com/images/products/7eaf9/2ad61/7eaf92ad6121d759c3f91042c80fd5bc243e2524a09baa1ae34429e1bcdde163_00.jpg',
		ratingimg: require('../../../assets/images/star.png'),
		desc: 'OnePlus 32 inch LED HD Ready Smart TV (32Y1GF58G)',
		price: '13,499',
		mrp: '19,499',
		discount: 32
	},
	{
		id: 6,
		image:
			'https://static.arzooo.com/images/products/67f5c/52656/67f5c52656c09c548ed8fdc4e7f8d3d49df69d78130c720cfdcbb9c5983b5613_00.jpg',
		ratingimg: require('../../../assets/images/star.png'),
		desc: 'Nu 43 inch Ultra HD(4K) Smart TV (LED43UWA1)',
		price: '22,949',
		mrp: '44,999',
		discount: 49
	}
]; */

//url

const Categories = () => {
	const [productData, setProductData] = useState<CategoryProps[]>([]);

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
		getProducts({ params });
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
						<icon.star />
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
					<Text numberOfLines={2} variant="titleMedium" style={[styles.title]}>
						{item.title}
					</Text>
					<Rupee money={item.storePrice} styles={[styles.price]} />
					<View style={[styles.mrpWrapper]}>
						<Rupee money={item.mrp} styles={[styles.mrp]} />
						<Text
							numberOfLines={2}
							variant="titleMedium"
							style={[styles.discount, { color: CustomColors.primary }]}
						>
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
					keyExtractor={(item) => item.id.toString()}
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
	price: {
		lineHeight: 20,
		fontSize: 14
	},
	mrpWrapper: {
		flexDirection: 'row',
		alignItems: 'center'
		// justifyContent: 'flex-start'
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
	},
	title: {
		lineHeight: 20
		// textAlign: 'center'
	}
});

export default Categories;
