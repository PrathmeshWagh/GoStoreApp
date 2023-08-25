import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import { useTheme } from 'hooks/index';
import { DefaultStyles } from 'primitives';

const Indicator = () => {
    const { colors } = useTheme();

    return (
        <View style={[styles.container]}>
            <ActivityIndicator
                color={colors.primary}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: DefaultStyles.DefaultPadding * 2,
    },
});

export default Indicator;
