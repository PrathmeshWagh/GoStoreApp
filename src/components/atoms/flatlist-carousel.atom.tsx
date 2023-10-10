import React, { useRef } from 'react';
import { FlatList, View, StyleSheet, Animated } from 'react-native';

import { useDimensions, useTheme } from '@hooks/index';
import { DefaultStyles } from '@primitives/index';

interface FlatListSliderProps {
	data: any[];
	renderItem: (info: { item: any; index: number }) => JSX.Element;
	ITEMS_TO_SHOW: number;
	showPagination?: boolean;
}

const FlatlistSlider = (props: FlatListSliderProps) => {
	const { data, renderItem, ITEMS_TO_SHOW, showPagination = true } = props;
	const scrollX = useRef(new Animated.Value(0)).current;
	const { viewportWidth } = useDimensions();
	const SLIDER_WIDTH = 100;
	const ITEM_WIDTH = viewportWidth / ITEMS_TO_SHOW;
	const { colors } = useTheme();
	const blueWidth = SLIDER_WIDTH * (ITEMS_TO_SHOW / data.length);

	const translateX = scrollX.interpolate({
		inputRange: [0, ITEM_WIDTH * 10 - viewportWidth],
		outputRange: [0, SLIDER_WIDTH - blueWidth],
		extrapolate: 'clamp'
	});

	return (
		<View style={[styles.container]}>
			<FlatList
				data={data}
				renderItem={renderItem}
				horizontal
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
					useNativeDriver: false
				})}
				scrollEventThrottle={16}
				snapToInterval={ITEM_WIDTH}
			/>
			{showPagination && (
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
					<Animated.View
						style={[
							{ width: blueWidth, backgroundColor: colors.primary, transform: [{ translateX }] },
							styles.slider
						]}
					/>
				</View>
			)}
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

export default FlatlistSlider;
