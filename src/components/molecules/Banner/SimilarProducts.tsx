import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Pressable,
	Image,
	FlatList,
	Animated
} from 'react-native';
import React, { useRef, useState } from 'react';
import { DefaultStyles, FontGilroy } from '@primitives/index';
import ViewMore from '@assets/icons/view-icon.svg';
import StarIcon from '@assets/icons/productDetails/star.svg';
import { CustomButtom, ProductSlider, Rupee } from 'components/atoms';
import { useDimensions, useTheme } from '@hooks/index';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CategoryItemWithRatingText from 'components/atoms/category-item-with-ratingtext-atom';

interface Props {
	title: string;
	// filter?: CustomTypes.ProductQueryParams;
	link?: string | null;
	className?: string | '';
}

export default function SimilarProducts({ title, link, response, event, onPress }: any) {
	const { colors } = useTheme();
	const { width, height } = useDimensions();
	const [data, SetData] = useState([1, 1, 1, 1]);
	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const ref = useRef();

	const handlePreviousPress = () => {
		if (currentIndex > 0) {
			setCurrentIndex(currentIndex - 1);
			ref.current.scrollToIndex({
				animated: true,
				index: parseInt(currentIndex) - 1
			});
		}
	};

	const handleNextPress = () => {
		if (currentIndex < data.length - 1) {
			setCurrentIndex(currentIndex + 1);
			ref.current.scrollToIndex({
				animated: true,
				index: parseInt(currentIndex) + 1
			});
		}
	};

	const renderItem = ({ item }: any) => {
		return (
			<View
				style={{
					width: width - 50,
					height: height / 2,
					justifyContent: 'center',
					flexDirection: 'row'
				}}
			>
				<View style={[styles.renderContainer, { borderColor: 'gray' }]}>
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
				<View style={[styles.renderContainer, { borderColor: 'gray' }]}>
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
			</View>
			// <CategoryItemWithRatingText item={item} onPress={() => {}} />
		);
	};

	return (
		<View>
			<View style={styles.header}>
				{title && <Text style={styles.title}>{title}</Text>}
				{link && (
					<TouchableOpacity style={styles.link} onPress={onPress}>
						<ViewMore width={35} height={18} />
						<Text style={styles.linkText}>View more</Text>
					</TouchableOpacity>
				)}
			</View>
			<View style={styles.carouselItem}>
				<Pressable style={styles.item}>
					<View style={styles.contentContainer}>
						{currentIndex != 0 && (
							<TouchableOpacity
								style={[styles.carouselButton, styles.leftChevron]}
								onPress={handlePreviousPress}
							>
								<Icon name={'chevron-left'} size={25} color={colors.primary} />
							</TouchableOpacity>
						)}

						<Animated.FlatList
							ref={ref}
							data={data}
							showsHorizontalScrollIndicator={false}
							pagingEnabled
							onScroll={(e: any) => {
								const x = e.nativeEvent.contentOffset.x;
								console.log('x vlaue', x);

								console.log('x' + x / width);

								setCurrentIndex((x / width).toFixed(0));
							}}
							horizontal
							renderItem={renderItem}
						/>
						{data.length - 1 == currentIndex ? null : (
							<TouchableOpacity
								style={[styles.carouselButton, styles.rightChevron]}
								onPress={handleNextPress}
							>
								<Icon name={'chevron-right'} size={25} color={colors.primary} />
							</TouchableOpacity>
						)}
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
		fontSize: 16,
		fontFamily: FontGilroy.Medium
	},
	link: {
		alignItems: 'flex-end'
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
		paddingRight: 10,
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
		width: 35,
		height: 35,
		borderRadius: 17,
		borderColor: 'green',
		borderWidth: 1,
		backgroundColor: 'white',
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
	},
	renderContainer: {
		flex: 1,
		borderWidth: 1,
		borderRadius: 20,
		marginHorizontal: 5,
		width: 200
	}
});
