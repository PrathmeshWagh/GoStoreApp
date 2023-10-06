import React from 'react';
import { View } from 'react-native';

import { container } from '@helpers/index';
import Header from '@molecules/pincode/header.molecule';
import Form from '@molecules/pincode/form.molecule';
import { KeyboardWrapper } from '@atoms/index';

const Pincode = () => {
    return (
        <KeyboardWrapper>
            <View style={{ ...container() }}>
                <Header/>
                <Form/>
            </View>
        </KeyboardWrapper>
    );
};

export default Pincode;

