import React from 'react';
import { View, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from 'hooks';

interface CustomStatusBarProps {
    backgroundColor?: string;
}

const CustomStatusBar = (props: CustomStatusBarProps) => {
    const { colors } = useTheme();
    const { backgroundColor = colors.primary } = props;
    const insets = useSafeAreaInsets();

    return (
        <View style={[{ backgroundColor, height: insets.top }]}>
            <StatusBar barStyle="light-content" backgroundColor={backgroundColor} />
        </View>
    );
};

export default CustomStatusBar;
