import React from 'react';
import { FlatList } from 'react-native';

import Categories from '@molecules/home/categories.molecule';

const componentList = [
    { id: '1', component: Categories },
];

const Home = () => {
    return (
        <FlatList
            data={componentList}
            renderItem={({ item }) => {
                const Component = item.component;
                return <Component />;
            }}
            keyExtractor={ item => item.id }
        />
    );
};

export default Home;
