import React from 'react';
import Login from '@organisms/login/login.organism';
import Layout from '@molecules/layout/layout.molecule';

const layout = {
    menu: false,
    search: false,
    back: true,
    logo: 'https://gostor.com/icons/header/logo-invert.svg',
    cart: false,
    pincode: true,
};

export default function LoginScreen() {
	return (
		<Layout layout={layout}>
			<Login />
		</Layout>
	);
}
