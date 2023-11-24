import React, { createContext, useContext, useState } from 'react';

interface SearchContextType {
	searchValue: string;
	setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC = ({ children }: any) => {
	const [searchValue, setSearchValue] = useState('');

	return (
		<SearchContext.Provider value={{ searchValue, setSearchValue }}>
			{children}
		</SearchContext.Provider>
	);
};

export const useSearchContext = (): SearchContextType => {
	const context = useContext(SearchContext);
	if (!context) {
		throw new Error('useSearch must be used within a SearchProvider');
	}
	return context;
};
