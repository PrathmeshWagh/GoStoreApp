import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { DefaultStyles, FontGilroy } from '@primitives/index';

export default function FeatureSection() {
	const features = [
		{
			icon: require('../../../assets/images/free-delivery.png'),
			label: 'Free Delivery',
			link: '/faqs?heading=order-delivery-related'
		},
		{
			icon: require('../../../assets/images/free-return.png'),
			label: '7 Days Easy Return',
			link: '/faqs?heading=return-related'
		},
		{
			icon: require('../../../assets/images/free-installation.png'),
			label: 'Free Installation',
			link: '/faqs?heading=installation-related'
		}
	];

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
		fontSize: 16,
		fontFamily: FontGilroy.Medium,
		textAlign: 'center'
	},
	icon: {
		width: 40,
		height: 40
	}
});
