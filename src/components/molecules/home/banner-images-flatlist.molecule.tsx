import React from 'react';
import { TouchableOpacity, View, ViewStyle, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import Config from 'react-native-config';

import { useChildBanner } from '@api/banners/use-child-banner.api';
import { ComponentWrapper, FastImages, FlatlistCarousel } from '@atoms/index';
import { useBannerClick } from '@hooks/index';
import { DefaultStyles } from '@primitives/index';

interface ProductListSectionProps {
    banner: ParentBannerData;
    itemWidth: number;
    textStyles?: any;
    containerStyles?: ViewStyle;
    imgHeight: number;
    itemsToShow: number;
}

const BannerImagesFlatlistSection = (props: ProductListSectionProps) => {
    const { banner, itemWidth, imgHeight, containerStyles, textStyles, itemsToShow } = props;
    const { data, isLoading, isError, refetch } = useChildBanner(banner.bannerType, banner.parentBannerId);
    const { bannerClick } = useBannerClick();

    const renderItem = ({ item }: { item: BannerData }) => {
        return (
            <TouchableOpacity
                style={[{ width: itemWidth, height: itemWidth * imgHeight, marginRight: 6 }]}
                onPress={() => bannerClick(item, banner.bannerType)}
            >
                {
                    item.imgs.map((bannerImage: BannerImage, index: number) => {
                        if (bannerImage.imgPosition === 'CENTER') {
                            return (
                                <FastImages
                                    key={index}
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
                <FlatlistCarousel
                    data={data?.data || []}
                    renderItem={renderItem}
                    ITEMS_TO_SHOW={itemsToShow}
                    showPagination={false}
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

export default BannerImagesFlatlistSection;
