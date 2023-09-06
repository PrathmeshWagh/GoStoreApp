import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

import { DefaultStyles } from '@primitives/index';
interface HeaderProps {
    title: string;
    body: {
        image: any,
        title: string;
    };
}

const Header = (props: HeaderProps) => {
    const { title, body } = props;

    return (
        <View>
            <View style={[styles.image]}>
                { body.image }
            </View>
            <Text
                variant="labelLarge"
                style={[styles.title]}
            >
                { title }
            </Text>
            <Text
                variant="titleMedium"
                style={[styles.para]}
            >
                { body.title }
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: DefaultStyles.DefaultPadding,
    },
    title: {
        paddingVertical: DefaultStyles.DefaultPadding,
        textAlign: 'center',
    },
    para: {
        paddingBottom: DefaultStyles.DefaultPadding,
        textAlign: 'center',
        maxWidth : 250,
        lineHeight : 22,
    },
});

export default Header;
