import React from 'react';
import { View, StyleSheet } from 'react-native';

import { FastImages } from '@atoms/index';
import { useDimensions } from '@hooks/index';

export default function Header() {
	const { width } = useDimensions();
	return (
		<View style={[styles.imageContainer, { width }]}>
			<FastImages
				url={'https://gostor.com/images/Auth/m-login-banner.png'}
				style={[styles.image]}
				mode="cover"
			/>
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
