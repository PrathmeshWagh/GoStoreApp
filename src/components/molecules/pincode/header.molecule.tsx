import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import FastImage from 'react-native-fast-image'

import { DefaultStyles } from '@primitives/index';

const Header = () => {
    return (
        <View style={[styles.container]}>
            <Text variant="headlineMedium">What’s your location?</Text>
            <Text
                variant="titleMedium"
                style={[styles.text1]}
            >
                We need your location to show available stores and products
            </Text>
            <FastImage
                style={{ width: "100%", height: 220 }}
                source={{
                    uri: 'https://gostor.com/images/Location-selection/location_map.png',
                    priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.contain}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: DefaultStyles.DefaultPadding,
        paddingVertical: DefaultStyles.DefaultPadding,
    },
    text1: {
        lineHeight: DefaultStyles.DefaultPadding + 4,
        marginTop: DefaultStyles.DefaultPadding - 10,
        marginBottom: DefaultStyles.DefaultPadding + 24,
    },
});

export default Header;


