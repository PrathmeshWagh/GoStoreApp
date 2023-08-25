import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Config from 'react-native-config';

import { useChildBanner } from '@api/banners/use-child-banner.api';
import { useDimensions } from '@hooks/index';
import { DefaultStyles } from '@primitives/index';
import { Carousel, FastImages } from '@atoms/index';

interface HomeSectionProps {
    banner: ParentBannerData
}

const HomeSection = (props: HomeSectionProps) => {
    const { banner } = props;
    const { data } = useChildBanner(banner.bannerType, banner.parentBannerId);
    const { width } = useDimensions();
    const itemWidth = Math.round(width * 0.92) + 5;

    const renderItem = ({ item }: { item: BannerData }) => {
        return (
            <TouchableOpacity
                style={[{ width: itemWidth, height: itemWidth * 0.4 }]}
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
        <>
            <Carousel
                data={data?.data || []}
                renderItem={renderItem}
                itemWidth={itemWidth}
                loop
                pagination
            />
        </>
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

export default HomeSection;
