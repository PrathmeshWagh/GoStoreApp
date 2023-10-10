import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { DefaultStyles, FontGilroy } from '@primitives/index';
import { features } from 'helpers/constants/product/product-feature';

export default function FeatureSection() {
	return (
		<View style={[styles.services, { marginVertical: 15 }]}>
			{features.map((feature, index) => (
				<View style={styles.box} key={`feature-${index}`}>
					<Image source={feature.icon} style={styles.icon} />
					<Text style={styles.text}>{feature.label}</Text>
				</View>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	services: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		gap: 10
	},
	box: {
		flex: 1,
		height: 100,
		backgroundColor: '#FFF',
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: '#e5e7eb',
		borderRadius: 8
	},
	text: {
		fontSize: 13,
		fontFamily: FontGilroy.Medium,
		textAlign: 'center'
	},
	icon: {
		width: 30,
		height: 30
	}
});
