import React from 'react';
import Categories from '@organisms/categories/categories.organism';

const CategoriesScreen = ({ route }: any) => {
	const categoryData = route.params;

	return <Categories categoryData={categoryData} />;
};

export default CategoriesScreen;
