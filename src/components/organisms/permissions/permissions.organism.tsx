import React, { useRef } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import Header from '@molecules/permissions/header.molecule';
import Footer from '@molecules/permissions/footer.molecule';
import { useDimensions, usePermissionHandlers } from '@hooks/index';

const sliderData: SliderItem[] = [
    {
        id: 1,
        header: {
            title: 'Location',
        },
        body: {
            title: 'Location body',
            image: '',
        },
        footer: {
            btnText: 'Next',
        },
    },
    {
        id: 2,
        header: {
            title: 'Notifications',
        },
        body: {
            title: 'Notifications body',
            image: '',
        },
        footer: {
            btnText: 'Next',
        },
    },
];

const Permissions = () => {
    const sliderRef = useRef(null);
    const { width } = useDimensions();
    const itemWidth = width;
    let currentItemIndex = 0;
    const { permissionHandler } = usePermissionHandlers(currentItemIndex, itemWidth, sliderRef, sliderData);

    const permissionRenderItem = (item: SliderItem) => {
        const { header, id } = item;

        return (
            <View style={[ styles.item, { width: itemWidth } ]}>
                <Header title={header.title}/>
                <Footer onPress={() => permissionHandler(id)}/>
            </View>
        );
    };

    return (
        <View style={[styles.container]}>
            <FlatList
                ref={sliderRef}
                data={sliderData}
                horizontal
                showsHorizontalScrollIndicator={false}
                scrollEnabled={false}
                keyExtractor={(item) => `${item.id}`}
                renderItem={({ item }) => permissionRenderItem(item)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        flex: 1,
    },
});

export default Permissions;
