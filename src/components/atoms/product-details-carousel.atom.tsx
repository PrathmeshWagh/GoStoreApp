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
			image:
				'https://static.arzooo.com/images/products/bc2b9/ca480/bc2b9ca4804c017dbb4de607077123ff0506c4aecb0b0a5b276e643ff3a40de0_03.jpg'
		},
		{
			id: 2,
			title: 'DEF',
			image: 'https://static.gostor.com/UPDATED_BANNER_IMAGES/image_1696080642373409'
		},
		{
			id: 3,
			title: 'GHE',
			image:
				'https://static.arzooo.com/images/products/bc2b9/ca480/bc2b9ca4804c017dbb4de607077123ff0506c4aecb0b0a5b276e643ff3a40de0_02.jpg'
		},
		{
			id: 4,
			title: 'IJK',
			image: 'https://static.gostor.com/UPDATED_BANNER_IMAGES/image_1696080642373409'
		},
		{
			id: 5,
			title: 'gdf',
			image:
				'https://static.arzooo.com/images/products/bc2b9/ca480/bc2b9ca4804c017dbb4de607077123ff0506c4aecb0b0a5b276e643ff3a40de0_03.jpg'
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
