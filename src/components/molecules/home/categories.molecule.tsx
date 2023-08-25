import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text } from 'react-native-paper';

import { useCategories } from '@api/categories/use-categories.api';
import { ComponentWrapper, FastImages } from '@atoms/index';

const Categories = () => {
    const { data, isLoading, isError, refetch } = useCategories();
    const categoryData = data?.data || [];

    const renderItem = ({ item }: { item: Category }) => {
        return (
            <View style={[ styles.container ]}>
                <FastImages
                    url={item.image}
                    style={styles.image}
                />
                <Text
                    variant="titleSmall"
                >
                    { item.displayName }
                </Text>
            </View>
        );
    };

    return (
        <ComponentWrapper
            loading={isLoading}
            error={isError}
            loadingText="Fetching categories..."
            errText="Unable to fetch categories."
            refetch={refetch}
        >
            <FlatList
                data={categoryData}
                renderItem={renderItem}
                horizontal={true}
                pagingEnabled={false}
                showsHorizontalScrollIndicator={false}
                keyExtractor={( item ) => `${item.id}`}
                style={[styles.flatlist]}
            />
        </ComponentWrapper>
    );
};

const styles = StyleSheet.create({
    flatlist: {
        paddingVertical: 12,
    },
    container: {
        marginHorizontal: 8,
        alignItems: 'center',
    },
    image: {
        width : 60,
        height: 60,
    },
});

export default Categories;
