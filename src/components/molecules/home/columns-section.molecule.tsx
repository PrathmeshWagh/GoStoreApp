import React from 'react';
import { FlatList, View, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import Config from 'react-native-config';

import { useChildBanner } from '@api/banners/use-child-banner.api';
import { FastImages } from '@atoms/index';
import { DefaultStyles } from '@primitives/index';

interface ColumnsSectionProps {
    banner: ParentBannerData;
    columns: number;
    textStyles?: any;
    containerStyles?: ViewStyle;
    imgHeight: number;
}

const ColumnsSection = (props: ColumnsSectionProps) => {
    const { banner, columns, textStyles, containerStyles, imgHeight } = props;
    const { data } = useChildBanner(banner.bannerType, banner.parentBannerId);

    const renderItem = ({ item }: { item: BannerData }) => {
        return (
            <TouchableOpacity
                style={[styles.itemContainer, { height: imgHeight }]}
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
            <FlatList
                data={data?.data || []}
                renderItem={renderItem}
                keyExtractor={(_, index) => `${index}`}
                numColumns={columns}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        borderRadius: DefaultStyles.DefaultRadius + 2,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});

export default ColumnsSection;
