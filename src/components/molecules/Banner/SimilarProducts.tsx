import { StyleSheet, Text, View, TouchableOpacity, Pressable, Image, FlatList } from 'react-native';
import React from 'react';
import { DefaultStyles, FontGilroy } from '@primitives/index';
import ViewMore from '@assets/icons/view-icon.svg';
import StarIcon from '@assets/icons/productDetails/star.svg';
import { CustomButtom, ProductSlider, Rupee } from 'components/atoms';
import { useTheme } from '@hooks/index';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
	title: string;
	// filter?: CustomTypes.ProductQueryParams;
	link?: string | null;
	className?: string | '';
}

const data = [
	{
		id: 1,
		title: 'ABC',
		image: 'https://static.gostor.com/UPDATED_BANNER_IMAGES/image_1695578198363559'
	},
	{
		id: 2,
		title: 'DEF',
		image: 'https://static.gostor.com/UPDATED_BANNER_IMAGES/image_1696080642373409'
	},
	{
		id: 3,
		title: 'GHE',
		image: 'https://static.gostor.com/UPDATED_BANNER_IMAGES/image_1696080642373409'
	},
	{
		id: 4,
		title: 'IJK',
		image: 'https://static.gostor.com/UPDATED_BANNER_IMAGES/image_1696080642373409'
	},
	{
		id: 5,
		title: 'gdf',
		image: 'https://static.gostor.com/UPDATED_BANNER_IMAGES/image_1696080642373409'
	},
	{
		id: 6,
		title: 'gff',
		image: 'https://static.gostor.com/UPDATED_BANNER_IMAGES/image_1696080642373409'
	},
	{
		id: 7,
		title: 'gff',
		image: 'https://static.gostor.com/UPDATED_BANNER_IMAGES/image_1696080642373409'
	}
];

export default function SimilarProducts({ title, link, response, event }: any) {
	const { colors } = useTheme();

	const renderItem = ({ item }: any) => {
		return (
			<View style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 20, marginHorizontal: 20 }}>
				<View style={[styles.ratingBox, { backgroundColor: colors.primary }]}>
					<Text style={styles.ratingText}>4</Text>
					<StarIcon width={12} height={12} />
				</View>

				<View style={[styles.imageContainer]}>
					<Image
						source={{
							uri: 'https://static.gostor.com/UPDATED_BANNER_IMAGES/image_1695578198363559'
						}}
						style={[styles.image]}
						resizeMode="contain"
					/>
				</View>

				<View style={styles.infoContainer}>
					<Text numberOfLines={2} style={[styles.title]}>
						television
					</Text>
					<Rupee money={12121} styles={[styles.price]} />
					<View style={[styles.mrpWrapper]}>
						<Rupee money={1212} styles={[styles.mrp]} />
						<Text numberOfLines={2} style={[styles.discount, { color: colors.primary }]}>
							12% off
						</Text>
					</View>
				</View>
			</View>
		);
	};

	return (
		<View>
			<View style={styles.header}>
				{title && <Text style={styles.title}>{title}</Text>}
				{link && (
					<TouchableOpacity style={styles.link} onPress={() => {}}>
						<ViewMore />
						<Text style={styles.linkText}>View more</Text>
					</TouchableOpacity>
				)}
			</View>
			<View style={styles.carouselItem}>
				<Pressable style={styles.item}>
					<View style={styles.contentContainer}>
						<TouchableOpacity
							style={[styles.carouselButton, styles.leftChevron]}
							onPress={() => {}}
						>
							<Icon name={'chevron-left'} size={25} color="#000" />
						</TouchableOpacity>

						<FlatList
							data={data}
							renderItem={renderItem}
							horizontal
							showsHorizontalScrollIndicator={true}
						/>
						<TouchableOpacity
							style={[styles.carouselButton, styles.rightChevron]}
							onPress={() => {}}
						>
							<Icon name={'chevron-right'} size={25} color="#000" />
						</TouchableOpacity>
					</View>
				</Pressable>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 16,
		paddingTop: 8
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 2
	},
	title: {
		fontSize: 18,
		fontFamily: FontGilroy.Medium
	},
	link: {
		alignItems: 'center'
	},
	linkImage: {
		width: 30,
		height: 25
	},
	linkText: {
		fontSize: 12,
		color: 'green'
	},
	item: {
		flex: 1,
		margin: 8,
		borderRadius: 20
	},
	ratingBox: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		top: 0,
		right: 0,
		// backgroundColor: CustomColors.primary,
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
		marginBottom: 20,
		height: 120
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
		fontSize: 16
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
		lineHeight: 20,
		marginRight: DefaultStyles.DefaultPadding - 8
	},
	discount: {
		lineHeight: 20,
		fontWeight: '600'
	},
	carouselButton: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: 'lightgray',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		zIndex: 1
	},
	contentContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		position: 'relative'
	},
	carouselItem: {
		flexDirection: 'row',
		alignItems: 'center'
	},

	leftChevron: {
		left: 0
	},
	rightChevron: {
		right: 0
	}
});
