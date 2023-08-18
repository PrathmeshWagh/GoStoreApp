import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

const Header = ({ title }) => {
    return (
        <View>
            <Text>
                { title }
            </Text>
        </View>
    );
};

export default Header;
