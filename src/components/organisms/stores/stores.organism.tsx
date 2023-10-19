import React from 'react';
import { ScrollView } from 'react-native';

import Header from '@molecules/stores/header.molecule';
import Guide from '@molecules/stores/guide.molecule';
import Store from '@molecules/stores/stores.molecule';

const Stores = () => {
    return (
        <ScrollView>
            <Header/>
            <Guide/>
            <Store/>
        </ScrollView>
    );
};

export default Stores;

