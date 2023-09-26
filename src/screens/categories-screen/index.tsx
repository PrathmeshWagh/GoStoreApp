import React from 'react';
import Categories from '@organisms/categories/categories.organism';

type CategoriesScreen = {
	route: any;
};

const CategoriesScreen = ({ route }: CategoriesScreen) => {
	const { url } = route.params;

	return <Categories url={url} />;
};

export default CategoriesScreen;
