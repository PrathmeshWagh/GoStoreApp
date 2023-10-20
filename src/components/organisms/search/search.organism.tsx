import React from 'react';
import { View } from 'react-native';

import HeaderSearch from '@molecules/search/header.molecule';
import Suggestions from '@molecules/search/suggestions.molecule';
import { container } from '@helpers/index';
import Trending from '@molecules/search/trending.molecule';

const Search = () => {
	return (
		<View style={{ ...container() }}>
            <HeaderSearch/>
            <Suggestions/>
            <Trending/>
        </View>
	);
};

export default Search;

