import React, { useRef } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import Header from '@molecules/permissions/header.molecule';
import Footer from '@molecules/permissions/footer.molecule';
import { useDimensions, usePermissionHandlers } from '@hooks/index';
import NotificationIcon from '@assets/icons/notification.svg';
import LocationIcon from '@assets/icons/location-icon.svg';

const sliderData: SliderItem[] = [
    {
        id: 1,
        header: {
            title: 'Allow your Location',
        },
        body: {
            title: 'We will need your location to give you better experience',
            image: <LocationIcon width={120} height={120}/>,
        },
        footer: {
            btnText: "Sure, I'd Like that",
        },
    },
    {
        id: 2,
        header: {
            title: 'Notifications',
        },
        body: {
            title: 'Enable your Notification to get regular update',
            image: <NotificationIcon width={120} height={120}/>,
        },
        footer: {
            btnText: 'Turn On',
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
        const { header, id, body, footer } = item;

        return (
            <View style={[ styles.item, { width: itemWidth } ]}>
                <Header title={header.title} body={body}/>
                <Footer footer={footer} onPress={() => permissionHandler(id)}/>
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
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Permissions;
