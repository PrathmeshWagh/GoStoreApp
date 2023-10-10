import React, { useRef } from 'react';
import { FlatList, View, StyleSheet, Animated } from 'react-native';

import { useDimensions, useTheme } from '@hooks/index';
import { DefaultStyles } from '@primitives/index';
import CategoryItem from './category-item.atom';

interface ProductSliderProps {
	data: ProductType[];
}

const ProductSlider = (props: ProductSliderProps) => {
	const { data } = props;
	const scrollX = useRef(new Animated.Value(0)).current;
	const { viewportWidth } = useDimensions();
	const SLIDER_WIDTH = 100;
	const ITEMS_TO_SHOW = 2.4;
	const ITEM_WIDTH = viewportWidth / ITEMS_TO_SHOW;
	const { colors } = useTheme();
	const blueWidth = SLIDER_WIDTH * (ITEMS_TO_SHOW / data?.length);

	const translateX = scrollX.interpolate({
		inputRange: [0, ITEM_WIDTH * 10 - viewportWidth],
		outputRange: [0, SLIDER_WIDTH - blueWidth],
		extrapolate: 'clamp'
	});

	const renderItem = ({ item }: { item: ProductType }) => {
		return (
			<CategoryItem
				price={item?.storePrice}
				mrp={item?.mrp}
				image={item.primaryImgPath}
				title={item.title}
				containerStyles={{ width: ITEM_WIDTH, backgroundColor: colors.onSecondary }}
				parentCategory={item?.parentCategory}
				productId={item?.productId}
				supplierId={item?.supplierId}
			/>
		);
	};

	return (
		<View style={[styles.container]}>
			<FlatList
				data={data}
				renderItem={renderItem}
				horizontal
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ paddingLeft: 16 }}
				onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
					useNativeDriver: false
				})}
				scrollEventThrottle={16}
				snapToInterval={ITEM_WIDTH}
			/>
			<View
				style={[
					{
						height: DefaultStyles.DefaultHeight - 48,
						width: SLIDER_WIDTH,
						backgroundColor: colors.tertiary
					},
					styles.sliderContainer
				]}
			>
				{/* <Animated.View
					style={[
						{ width: blueWidth, backgroundColor: colors.primary, transform: [{ translateX }] },
						styles.slider
					]}
				/> */}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingBottom: DefaultStyles.DefaultPadding + 16,
		paddingTop: DefaultStyles.DefaultPadding
	},
	sliderContainer: {
		position: 'absolute',
		bottom: 10,
		alignSelf: 'center',
		flexDirection: 'row',
		borderRadius: DefaultStyles.DefaultRadius
	},
	slider: {
		overflow: 'hidden',
		borderRadius: DefaultStyles.DefaultRadius
	}
});

export default ProductSlider;
