import React from 'react';

import Layout from '@molecules/layout/layout.molecule';
import Stores from '@organisms/stores/stores.organism';


const layout = {
    menu: true,
    search: false,
    back: false,
    logo: 'https://gostor.com/icons/header/logo-invert.svg',
    cart: true,
    pincode: true,
};

export default function StoreScreen() {
	return (
		<Layout layout={layout}>
			<Stores/>
		</Layout>
	);
}
