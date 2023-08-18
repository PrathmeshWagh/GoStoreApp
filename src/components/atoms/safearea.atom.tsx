import React, { ReactNode } from 'react';
import { ViewStyle, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface SafeareaProps {
    children: ReactNode;
    styles?: ViewStyle;
}

const Safearea = (props: SafeareaProps) => {
    const { children, styles } = props;

    return (
        <SafeAreaView style={[safeStyles.container, styles]}>
            { children }
        </SafeAreaView>
    );
};

const safeStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Safearea;
