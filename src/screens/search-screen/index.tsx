import React from 'react';

import Search from '@organisms/search/search.organism';
import { LayoutWrapper } from '@atoms/index';
import { SearchProvider } from '@context/search.context';

const SearchScreen = () => {
	return (
		<LayoutWrapper>
			<SearchProvider>
				<Search/>
			</SearchProvider>
        </LayoutWrapper>
	);
};

export default SearchScreen;
