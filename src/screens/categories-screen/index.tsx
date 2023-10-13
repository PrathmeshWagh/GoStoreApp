import React from 'react';
import Categories from '@organisms/categories/categories.organism';
import Layout from 'components/molecules/layout/layout.molecule';

const layout = {
	menu: false,
	search: true,
	back: true,
	logo: 'https://gostor.com/icons/header/logo-invert.svg',
	cart: true,
	pincode: true
};

const CategoriesScreen = ({ route }: any) => {
	const categoryData = route.params;

	return (
		<Layout layout={layout}>
			<Categories categoryData={categoryData} />
		</Layout>
	);
};

export default CategoriesScreen;
