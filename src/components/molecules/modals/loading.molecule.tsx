import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { useSelector } from 'react-redux';

import { useTheme } from '@hooks/index';
import { DefaultStyles } from 'primitives';
import { RootState } from '@slices/store';

const LoadingModal = () => {
    const { colors } = useTheme();
    const modal = useSelector((state: RootState) => state.modal);

    return (
        <View style={[styles.container]}>
            <ActivityIndicator size="small" color={colors.primary}/>
            <Text
                variant="labelLarge"
                style={{ paddingHorizontal: 12 }}
            >
                { modal.title }
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: DefaultStyles.DefaultPadding - 8,
    },
});

export default LoadingModal;
