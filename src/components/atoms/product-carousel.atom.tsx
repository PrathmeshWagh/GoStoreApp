import React, { useRef } from 'react';
import { FlatList, View, StyleSheet, Animated } from 'react-native';
import { Text } from 'react-native-paper';

import { useDimensions, useTheme } from '@hooks/index';
import { DefaultStyles } from '@primitives/index';
import FastImages from './image.atom';
import Rupee from './rupee.atom';
import { getDiscount } from '@helpers/utils.helpers';

interface ProductSliderProps {
    data: ProductType[]
}

const ProductSlider = (props: ProductSliderProps) => {
    const { data } = props;
    const scrollX = useRef(new Animated.Value(0)).current;
    const { viewportWidth } = useDimensions();
    const SLIDER_WIDTH = 100;
    const ITEMS_TO_SHOW = 2.4;
    const ITEM_WIDTH = viewportWidth / ITEMS_TO_SHOW;
    const { colors } = useTheme();
    const blueWidth = SLIDER_WIDTH * (ITEMS_TO_SHOW / data.length);

    const translateX = scrollX.interpolate({
        inputRange: [0, (ITEM_WIDTH * 10) - viewportWidth],
        outputRange: [0, SLIDER_WIDTH - blueWidth],
        extrapolate: 'clamp',
    });

    const renderItem = ({ item }: { item: ProductType }) => {
        const discount = getDiscount(item?.storePrice, item?.mrp);

        return (
            <View style={[styles.item, { width: ITEM_WIDTH, backgroundColor: colors.onSecondary }]}>
                <View style={[styles.imageContainer]}>
                    <FastImages
                        url={item.primaryImgPath}
                        style={[styles.image]}
                        mode="contain"
                    />
                </View>
                <Text
                    numberOfLines={2}
                    variant="titleMedium"
                    style={{ lineHeight: 20, alignSelf: 'center' }}
                >
                    {item.title}
                </Text>
                <Rupee
                    money={item.storePrice}
                    styles={[styles.price]}
                />
                <View style={[styles.mrpWrapper]}>
                    <Rupee
                        money={item.mrp}
                        styles={[styles.mrp]}
                    />
                    <Text
                        numberOfLines={2}
                        variant="titleMedium"
                        style={{ lineHeight: 20, color: colors.primary, fontWeight: '600', marginLeft: 8 }}
                    >
                        {discount}%off
                    </Text>
                </View>
            </View>
        );
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.onSecondary }]}>
            <FlatList
                data={data}
                renderItem={renderItem}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingLeft: 16 }}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                  )}
                scrollEventThrottle={16}
                snapToInterval={ITEM_WIDTH}
            />
            <View style={[{ height: DefaultStyles.DefaultHeight - 48, width: SLIDER_WIDTH, backgroundColor: colors.tertiary }, styles.sliderContainer]}>
                <Animated.View style={[{ width: blueWidth, backgroundColor: colors.primary, transform: [{ translateX }] }, styles.slider]} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: DefaultStyles.DefaultPadding + 16,
        paddingTop: DefaultStyles.DefaultPadding,
    },
    item: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
    },
    sliderContainer: {
        position: 'absolute',
        bottom: 10,
        alignSelf: 'center',
        flexDirection: 'row',
        borderRadius: DefaultStyles.DefaultRadius,
    },
    slider: {
        overflow: 'hidden',
        borderRadius: DefaultStyles.DefaultRadius,
    },
    imageContainer: {
        width: '100%',
        height: 150,
        marginBottom: 8,
    },
    image: {
        borderRadius: DefaultStyles.DefaultRadius + 2,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    price: {
        marginVertical: DefaultStyles.DefaultPadding - 8,
        lineHeight: 20,
        fontSize: 18,
    },
    mrpWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    mrp: {
        color: '#AAB7B8',
        fontSize: 14,
        fontWeight: '400',
        textDecorationLine: 'line-through',
        lineHeight: 20,
    },
});

export default ProductSlider;
