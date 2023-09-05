import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import Config from 'react-native-config';

import { DefaultStyles } from '@primitives/index';
import { formatUrl, getDiscount } from '@helpers/index';
import FastImages from './image.atom';
import Rupee from './rupee.atom';
import { useEnhancedNavigation, useTheme } from '@hooks/index';
import { AppDispatch } from '@slices/store';
import { closeModal, openModal } from 'slices/modal.slice';
import { RouteConstants } from '@routes/constants.routes';
import { updateUrl } from '@slices/webview-url.slice';

interface CategoryItemProps {
    price: number;
    mrp: number;
    image: string;
    title: string;
    containerStyles: ViewStyle;
    parentCategory: string;
    productId: string;
    supplierId: number;
}

const CategoryItem = (props: CategoryItemProps) => {
    const { navigate } = useEnhancedNavigation();
    const dispatch = useDispatch<AppDispatch>();
    const { price, mrp, image, title, containerStyles, parentCategory, productId, supplierId } = props;
    const discount = getDiscount(price, mrp);
    const { colors } = useTheme();

    const handlePress = () => {
        let url = `/category/${parentCategory}/${formatUrl(title)}?id=${productId}&supplierId=${supplierId}`;
        dispatch(openModal({
            view: 'loading',
            title: 'Redirecting...',
        }));
        dispatch(updateUrl({ url: `${Config.BASE_WEBVIEW_URL}${url}` }));
        navigate(RouteConstants.MainWebviewScreenRoute);
        dispatch(closeModal());
    };

    return (
        <TouchableRipple onPress={handlePress}>
            <View style={[styles.item, containerStyles]}>
                <View style={[styles.imageContainer]}>
                    <FastImages
                        url={image}
                        style={[styles.image]}
                        mode="contain"
                    />
                </View>
                <Text
                    numberOfLines={2}
                    variant="titleMedium"
                    style={[styles.title]}
                >
                    {title}
                </Text>
                <Rupee
                    money={price}
                    styles={[styles.price]}
                />
                <View style={[styles.mrpWrapper]}>
                    <Rupee
                        money={mrp}
                        styles={[styles.mrp]}
                    />
                    <Text
                        numberOfLines={2}
                        variant="titleMedium"
                        style={[styles.discount, { color: colors.primary }]}
                    >
                        {discount}%off
                    </Text>
                </View>
            </View>
        </TouchableRipple>
    );
};

const styles = StyleSheet.create({
    item: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 6,
        borderRadius: DefaultStyles.DefaultRadius,
        padding: DefaultStyles.DefaultPadding - 10,
    },
    imageContainer: {
        width: '100%',
        height: 120,
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
        fontSize: 14,
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
    discount: {
        lineHeight: 20,
        fontWeight: '600',
        marginLeft: DefaultStyles.DefaultPadding - 8,
    },
    title: {
        lineHeight: 20,
        textAlign: 'center',
    },
});

export default CategoryItem;
