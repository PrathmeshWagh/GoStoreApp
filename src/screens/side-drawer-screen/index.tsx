import React from 'react';

import Layout from '@molecules/layout/layout.molecule';
import SideDrawer from '@organisms/side-drawer/side-drawer.organism';

const layout = {
    menu: false,
    search: false,
    back: true,
    logo: '',
    cart: false,
    pincode: false,
};

const SideDrawerScreen = () => {
	return (
		<Layout layout={layout}>
            <SideDrawer/>
		</Layout>
	);
};

export default SideDrawerScreen;
