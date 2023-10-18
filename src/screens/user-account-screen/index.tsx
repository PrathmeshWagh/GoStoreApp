import React from 'react';
import UserAccount from 'components/organisms/account';
import Layout from 'components/molecules/layout/layout.molecule';

const layout = {
	menu: true,
	search: true,
	back: false,
	logo: 'https://gostor.com/icons/header/logo-invert.svg',
	cart: true,
	pincode: true
};

const UserAccountScreen = () => {
	return (
		<Layout layout={layout}>
			<UserAccount />
		</Layout>
	);
};

export default UserAccountScreen;
