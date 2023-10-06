import React, { ReactNode } from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform, ScrollView, ViewStyle } from 'react-native';

import { DefaultStyles } from '@primitives/index';

interface KeyboardWrapperProps {
    children: ReactNode;
    scrollviewStyles?: ViewStyle
}

const KeyboardWrapper = (props: KeyboardWrapperProps) => {
    const { children, scrollviewStyles } = props;
    return (
        <KeyboardAvoidingView
            style={[ styles.container ]}
            behavior={ Platform.OS === 'ios' ? 'padding' : 'height' }
            keyboardVerticalOffset={ Platform.OS === 'ios' ? 0 : 20 }
        >
            <ScrollView
                contentContainerStyle={[styles.scrollview, scrollviewStyles]}
                keyboardShouldPersistTaps="always"
                showsVerticalScrollIndicator={false}
            >
                { children }
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: DefaultStyles.DefaultPadding,
        paddingVertical: DefaultStyles.DefaultPadding,
    },
    scrollview: {
        flexGrow: 1,
    },
});

export default KeyboardWrapper;
