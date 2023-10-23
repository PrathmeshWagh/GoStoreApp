import React from 'react';

import Layout from '@molecules/layout/layout.molecule';
import Otp from '@organisms/otp/otp.organism';

const layout = {
	menu: false,
	search: false,
	back: true,
	logo: '',
	cart: false,
	pincode: false
};

export default function OtpScreen() {
	return (
		<Layout layout={layout}>
			<Otp />
		</Layout>
	);
}
