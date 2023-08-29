import React from 'react';
import { View, ViewStyle } from 'react-native';
import { Text } from 'react-native-paper';

import { useChildBanner } from '@api/banners/use-child-banner.api';
import { ComponentWrapper } from '@atoms/index';
import { useProducts } from 'api/products/use-products.api';

interface ProductListSectionProps {
    banner: ParentBannerData;
    columns: number;
    textStyles?: any;
    containerStyles?: ViewStyle;
    imgHeight: number;
}

const ProductListSection = (props: ProductListSectionProps) => {
    const { banner, columns, textStyles, containerStyles, imgHeight } = props;
    const { data, isLoading } = useChildBanner(banner.bannerType, banner.parentBannerId, String(banner.tagType));
    const productsData = data?.data?.map((product) => {
        if ('productId' in product) {
            return product.productId;
        }
    }).join(',');
    const { data: productData, isLoading: loading, isError: error, refetch } = useProducts(String(productsData));

    return (
        <ComponentWrapper
            loading={isLoading || loading}
            error={error}
            errText="Failed to fetch"
            refetch={refetch}
        >
            <View style={containerStyles}>
                {
                    <Text
                        variant="labelLarge"
                        style={textStyles}
                    >
                        { banner.title }
                    </Text>
                }
            </View>
        </ComponentWrapper>
    )
};

export default ProductListSection;
