import React from 'react';
import { FlatList } from 'react-native';

import { useSearch } from '@api/search/search.api';
import { Spinner } from '@atoms/index';
import { DefaultStyles } from '@primitives/index';
import Item from './item.molecule';
import { useSearchContext } from '@context/search.context';

const Suggestions = () => {
    const { data, isLoading } = useSearch();
    const { searchValue } = useSearchContext();

    if (isLoading) {
        return (
            <Spinner
                text="Fetching products..."
                containerStyles={{ marginTop: DefaultStyles.DefaultPadding * 2 }}
            />
        );
    }

    if (searchValue.length > 0) {
        return (
            <FlatList
                data={data || []}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <Item item={item} />}
            />
        );
    }

    return null;
};

export default Suggestions;
