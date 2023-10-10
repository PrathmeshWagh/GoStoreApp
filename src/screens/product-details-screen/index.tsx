import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Layout from '@molecules/layout/layout.molecule';
import ProductDetails from '@organisms/product/product.organism';

export default function ProductDetailsScreen({ route }: any) {
	const Productitem = route.params.item;
	const categories = route.params.categories;

	const layout = {
		menu: false,
		search: false,
		back: true,
		logo: 'https://gostor.com/icons/header/logo-invert.svg',
		cart: false,
		pincode: false
	};
	return (
		<Layout layout={layout}>
			<ProductDetails Productitem={Productitem} categories={categories} />
		</Layout>
	);
}

const styles = StyleSheet.create({});
