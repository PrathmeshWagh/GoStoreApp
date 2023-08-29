import React from 'react';
import { Text } from 'react-native-paper';

interface RupeeProps {
    money: number;
    styles?: any;
}

const Rupee = (props: RupeeProps) => {
    const { money, styles } = props;

    return (
        <Text
            variant="labelLarge"
            style={styles}
        >
            {`\u20B9${money}`}
        </Text>
    );
};

export default Rupee;
