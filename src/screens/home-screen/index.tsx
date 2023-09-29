import React from 'react';

import Layout from '@molecules/layout/layout.molecule';
import Home from '@organisms/home/home.organism';

const layout = {
	menu: true,
	search: false,
	back: false,
	logo: 'https://gostor.com/icons/header/logo-invert.svg',
	cart: false,
	pincode: false
};

const HomeScreen = () => {
	return (
		<Layout layout={layout}>
			<Home />
		</Layout>
	);
};

export default HomeScreen;
