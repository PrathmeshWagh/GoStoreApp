import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

import { FastImages } from '@atoms/index';
import { useDimensions } from '@hooks/index';
import { centerBoth } from '@helpers/index';
import { DefaultStyles } from '@primitives/index';

export default function Header() {
	const { width } = useDimensions();

	return (
        <View>
            <View style={[styles.imageContainer, { width }]}>
                <FastImages
                    url={'https://gostor.com/images/Auth/m-login-banner.png'}
                    style={[styles.image]}
                    mode="cover"
                />
            </View>
            <View style={{ ...centerBoth() }}>
                <Text variant="titleMedium">Just One Step Away!</Text>
                <Text variant="labelLarge" style={{ marginTop: DefaultStyles.DefaultPadding }}>
                    Enter Verification Code here
                </Text>
            </View>
        </View>
	);
}

const styles = StyleSheet.create({
	imageContainer: {
        width: '100%',
		height: 300,
		marginBottom: 8,
	},
    image: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
});

