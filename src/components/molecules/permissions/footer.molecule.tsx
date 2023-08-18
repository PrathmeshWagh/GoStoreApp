import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

interface FooterProps {
    onPress: () => void;
}

const Footer = (props: FooterProps) => {
    const { onPress } = props;

    return (
        <View>
            <Button
                mode="elevated"
                onPress={onPress}
            >
                Press me
            </Button>
        </View>
    );
};

export default Footer;
