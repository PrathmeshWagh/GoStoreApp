import React from 'react';
import Geocoder from 'react-native-geocoding';

import Layout from '@molecules/layout/layout.molecule';
import Location from '@organisms/location/location.organism';

const layout = {
    menu: false,
    search: false,
    back: true,
    logo: 'https://gostor.com/icons/header/logo-invert.svg',
    cart: false,
    pincode: false,
};

const LocationScreen = () => {
    Geocoder.init('AIzaSyDf3OfiD1eSn4Wm3BVNNf6AhoNxl59aYUY');

    return (
        <Layout layout={layout}>
            <Location/>
        </Layout>
    );
};

export default LocationScreen;
