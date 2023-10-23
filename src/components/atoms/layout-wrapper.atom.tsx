import React, { ReactNode } from 'react';
import { ViewStyle, StyleSheet, SafeAreaView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useTheme } from 'hooks/index';
import CustomStatusBar from './status-bar.atom';

interface LayoutWrapperProps {
    children: ReactNode;
    styles?: ViewStyle;
    statusBarColor?: string;
}

const LayoutWrapper = (props: LayoutWrapperProps) => {
    const { children, styles, statusBarColor } = props;
    const { colors } = useTheme();

    return (
        <>
            <SafeAreaProvider>
                <CustomStatusBar
                    backgroundColor={statusBarColor ? statusBarColor : colors.primary}
                />
                <SafeAreaView style={[wrapperStyles.container, styles]}>
                    { children }
                </SafeAreaView>
            </SafeAreaProvider>
        </>
    );
};

const wrapperStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default LayoutWrapper;
