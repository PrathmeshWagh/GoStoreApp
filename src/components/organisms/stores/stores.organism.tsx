import React from 'react';
import { ScrollView } from 'react-native';

import Header from '@molecules/stores/header.molecule';
import Guide from '@molecules/stores/guide.molecule';

const Stores = () => {
    return (
        <ScrollView>
            <Header/>
            <Guide/>
        </ScrollView>
    );
};

export default Stores;

