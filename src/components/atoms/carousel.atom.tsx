import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import { useDimensions, useTheme } from '@hooks/index';
import { DefaultStyles } from 'primitives';

interface CarouselProps {
    data: any[];
    renderItem: (info: { item: any, index: number }) => JSX.Element;
    sliderWidth?: number;
    itemWidth: number;
    inactiveSlideScale?: number;
    loop?: boolean;
    pagination?: boolean;
    enableSnap?: boolean;
}

const CarouselSlider = (props: CarouselProps) => {
    const { data, renderItem, sliderWidth, itemWidth, inactiveSlideScale, loop, pagination, enableSnap = true } = props;
    const { width } = useDimensions();
    const [currentItem, setCurrentItem] = useState(0);
    const { colors } = useTheme();

    return (
        <>
            <Carousel
                data={data}
                renderItem={renderItem}
                sliderWidth={sliderWidth ? sliderWidth : width}
                itemWidth={itemWidth}
                inactiveSlideScale={inactiveSlideScale ? inactiveSlideScale : 0.97}
                loop={loop ? loop : false}
                enableSnap={enableSnap}
                onSnapToItem={(index) => setCurrentItem(index)}
                keyExtractor={(_, index) => `${index}`}
            />
            {
                pagination &&
                    <Pagination
                        dotsLength={data.length}
                        activeDotIndex={currentItem}
                        dotStyle={[styles.activeDotStyles, { backgroundColor: colors.primary }]}
                        inactiveDotStyle={[styles.inActiveDotStyles]}
                        inactiveDotOpacity={0.4}
                        inactiveDotScale={1}
                        containerStyle={{ paddingVertical: DefaultStyles.DefaultPadding - 10 }}
                        dotContainerStyle={{ marginHorizontal: DefaultStyles.DefaultPadding - 12 }}
                    />
            }
        </>
    );
};

const styles = StyleSheet.create({
    activeDotStyles: {
        width: DefaultStyles.DefaultPadding - 2,
        height: DefaultStyles.DefaultPadding - 10,
        borderRadius: DefaultStyles.DefaultPadding,
    },
    inActiveDotStyles: {
        width: DefaultStyles.DefaultPadding - 10,
        height: DefaultStyles.DefaultPadding - 10,
        borderRadius: DefaultStyles.DefaultPadding,
    },
});

export default CarouselSlider;
