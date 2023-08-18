import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

interface HeaderProps {
    title: string;
}

const Header = (props: HeaderProps) => {
    const { title } = props;

    return (
        <View>
            <Text>
                { title }
            </Text>
        </View>
    );
};

export default Header;
