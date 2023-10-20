import React from 'react';

import { KeyboardWrapper } from '@atoms/index';
import Header from '@molecules/login/header.molecule';
import Form from '@molecules/login/form.molecule';

export default function Login() {
	return (
		<KeyboardWrapper containerStyles={{ paddingHorizontal: 0, paddingVertical: 0 }}>
			<Header/>
			<Form/>
		</KeyboardWrapper>
	);
}
