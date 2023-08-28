import React from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle, View } from 'react-native';
import Config from 'react-native-config';

import { useChildBanner } from '@api/banners/use-child-banner.api';
import { DefaultStyles } from '@primitives/index';
import { Carousel, ComponentWrapper, FastImages } from '@atoms/index';
import { Text } from 'react-native-paper';

interface BannerImagesSectionProps {
    banner: ParentBannerData;
    itemWidth: number;
    imgHeight: number;
    containerStyles?: ViewStyle;
    textStyles?: any;
}

const BannerImagesSection = (props: BannerImagesSectionProps) => {
    const { banner, itemWidth, imgHeight, containerStyles, textStyles } = props;
    const { data, isLoading, isError, refetch } = useChildBanner(banner.bannerType, banner.parentBannerId);

    const renderItem = ({ item }: { item: BannerData }) => {
        return (
            <TouchableOpacity
                style={[{ width: itemWidth, height: itemWidth * imgHeight }]}
            >
                {
                    item.imgs.map((bannerImage: BannerImage) => {
                        if (bannerImage.imgPosition === 'CENTER') {
                            return (
                                <FastImages
                                    key={bannerImage.imgPath}
                                    url={`${Config.BASE_IMAGE}/${bannerImage.imgPath}`}
                                    style={[styles.image]}
                                    mode="cover"
                                />
                            );
                        }
                        return null;
                    })
                }
            </TouchableOpacity>
        );
    };

    return (
        <ComponentWrapper
            loading={isLoading}
            error={isError}
            errText="Failed to fetch"
            refetch={refetch}
        >
            <View style={containerStyles}>
                {
                    banner.bannerName !== 'HOMEPAGE_PRIMARY_BANNER' &&
                        <Text
                            variant="labelLarge"
                            style={textStyles}
                        >
                            { banner.title }
                        </Text>
                }
                <Carousel
                    data={data?.data || []}
                    renderItem={renderItem}
                    itemWidth={itemWidth}
                    loop
                    pagination
                />
            </View>
        </ComponentWrapper>
    );
};

const styles = StyleSheet.create({
    image: {
        borderRadius: DefaultStyles.DefaultRadius + 2,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});

export default BannerImagesSection;
