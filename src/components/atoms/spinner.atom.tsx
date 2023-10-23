import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';

import { useTheme } from '@hooks/index';
import { centerBoth, container } from '@helpers/index';
import { DefaultStyles } from '@primitives/index';

interface SpinnerProps {
	containerStyles?: any;
    size?: 'small' | 'large';
    color?: string;
    text?: string;
}

const Spinner = (props: SpinnerProps) => {
    const { colors } = useTheme();
	const { containerStyles, size = 'small', color = colors.primary, text } = props;

	return (
        <View style={[containerStyles, styles.container]}>
            <ActivityIndicator
                animating={true}
                color={color}
                size={size}
            />
            {
                text !== '' &&
                    <Text
                        style={[styles.text]}
                        variant="titleMedium"
                    >
                        { text }
                    </Text>
            }
        </View>
	);
};

const styles = StyleSheet.create({
    container: {
        ...container(),
        ...centerBoth(),
    },
    text: {
        marginTop: DefaultStyles.DefaultPadding,
    },
});

export default Spinner;

