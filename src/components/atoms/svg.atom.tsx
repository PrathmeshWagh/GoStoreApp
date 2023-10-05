import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Image as SvgImage } from 'react-native-svg';

export const CustomSvgImage = ({ source, width, height }: any) => {
	return (
		<Svg width={width} height={height}>
			<SvgImage width="100%" height="100%" href={source} />
		</Svg>
	);
};
