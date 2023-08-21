import React from 'react';

import Layout from '@molecules/layout/layout.molecule';
import { Text } from 'react-native';

const layout = {
    menu: true,
    search: true,
    back: false,
    logo: 'https://gostor.com/icons/header/logo-invert.svg',
    cart: true,
    pincode: true,
};

const HomeScreen = () => {

    return (
        <Layout layout={layout}>
            <Text>
                hello
            </Text>
        </Layout>
    );
};

export default HomeScreen;
