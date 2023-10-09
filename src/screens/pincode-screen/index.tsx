import React from 'react';

import Layout from '@molecules/layout/layout.molecule';
import Pincode from '@organisms/pincode/pincode.organism';

const layout = {
    menu: false,
    search: false,
    back: true,
    logo: 'https://gostor.com/icons/header/logo-invert.svg',
    cart: false,
    pincode: false,
};

const PincodeScreen = () => {

    return (
        <Layout layout={layout}>
            <Pincode/>
        </Layout>
    );
};

export default PincodeScreen;
