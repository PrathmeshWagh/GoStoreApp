import React from 'react';

import { KeyboardWrapper } from '@atoms/index';
import Header from '@molecules/otp/header.molecule';
import Form from '@molecules/otp/form.molecule';

export default function Otp() {
	return (
		<KeyboardWrapper containerStyles={{ paddingHorizontal: 0, paddingVertical: 0 }}>
			<Header/>
			<Form/>
		</KeyboardWrapper>
	);
}
