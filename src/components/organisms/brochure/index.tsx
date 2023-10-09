import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { DefaultStyles, FontGilroy } from '@primitives/index';

export default function Brochure() {
	return (
		<View>
			<Text style={{ fontFamily: FontGilroy.Bold, fontSize: 17 }}>
				Know more about this product
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({});
