import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import CarouselSlider from './carousel.atom';
import { useDimensions, usePermissionHandlers } from '@hooks/index';
import FastImage from 'react-native-fast-image';

export default function ProductdetailsSlider() {
	const { width, height } = useDimensions();
	const data = [
		{
			id: 1,
			title: 'ABC',
			image: 'https://static.gostor.com/UPDATED_BANNER_IMAGES/image_1695578198363559'
		},
		{
			id: 2,
			title: 'DEF',
			image: 'https://static.gostor.com/UPDATED_BANNER_IMAGES/image_1696080642373409'
		},
		{
			id: 3,
			title: 'GHE',
			image: 'https://static.gostor.com/UPDATED_BANNER_IMAGES/image_1696080642373409'
		},
		{
			id: 4,
			title: 'IJK',
			image: 'https://static.gostor.com/UPDATED_BANNER_IMAGES/image_1696080642373409'
		},
		{
			id: 5,
			title: 'gdf',
			image: 'https://static.gostor.com/UPDATED_BANNER_IMAGES/image_1696080642373409'
		},
		{
			id: 6,
			title: 'gff',
			image: 'https://static.gostor.com/UPDATED_BANNER_IMAGES/image_1696080642373409'
		},
		{
			id: 7,
			title: 'gff',
			image: 'https://static.gostor.com/UPDATED_BANNER_IMAGES/image_1696080642373409'
		}
	];

	const renderCarousel = ({ item, index }: any) => {
		return (
			<View>
				<FastImage
					style={{ width: '100%', height: height / 2 }}
					source={{
						uri: item.image,
						priority: FastImage.priority.normal
					}}
					resizeMode={FastImage.resizeMode.contain}
				/>
			</View>
		);
	};

	return (
		<View style={styles.container}>
			<CarouselSlider
				data={data}
				renderItem={renderCarousel}
				itemWidth={width}
				pagination={true}
				loop={true}
				inactiveSlideScale={0.9}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginBottom: 20
	}
});
