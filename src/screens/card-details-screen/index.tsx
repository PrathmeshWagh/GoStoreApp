import React from 'react';
import Layout from '@molecules/layout/layout.molecule';
import CardDetails from 'components/organisms/payment/cards/card_details.organism';

export default function CartScreen() {
	const layout = {
		menu: false,
		search: true,
		back: true,
		logo: 'https://gostor.com/icons/header/logo-invert.svg',
		cart: true,
		pincode: true
	};
	return (
		<Layout layout={layout}>
			<CardDetails />
		</Layout>
	);
}
