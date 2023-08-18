import React, { useRef } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import Header from '@molecules/permissions/header.molecule';

const sliderData = [
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
        id: 1,
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

    const permissionRenderItem = (item) => {
        console.log(item);
        return(
            <View>

            </View>
        )
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
});

export default Permissions;
