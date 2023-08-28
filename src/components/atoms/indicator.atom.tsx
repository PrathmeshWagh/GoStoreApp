import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';

import { useTheme } from '@hooks/index';
import { DefaultStyles } from '@primitives/index';

interface IndicatorProps {
    text?: string;
    textStyles?: any;
}

const Indicator = (props: IndicatorProps) => {
    const { colors } = useTheme();
    const { text, textStyles } = props;

    return (
        <View style={[styles.container]}>
            <ActivityIndicator
                color={colors.primary}
            />
            {
                text !== '' &&
                    <Text
                        style={textStyles}
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
        paddingTop: DefaultStyles.DefaultPadding * 2,
        alignItems: 'center',
    },
});

export default Indicator;
