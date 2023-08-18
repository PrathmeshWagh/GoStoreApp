import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import LottieView from 'lottie-react-native';

import { useTheme, useDimensions, useIntialNavigation } from '@hooks/index';

const Splash = () => {
    const { colors } = useTheme();
    const { width, height } = useDimensions();
    const { redirectToWhichScreen } = useIntialNavigation();

    return (
        <View style={[styles.container, { backgroundColor: colors.primary, width, height }]}>
            <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
            <LottieView source={require('../../../../assets/lottie/splash.json')}
                autoPlay
                loop={false}
                resizeMode="cover"
                style={styles.splash}
                onAnimationFinish={() => redirectToWhichScreen() }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alighItems: 'center',
        justifyContent: 'center',
    },
    splash: {
        width: 'auto',
        height: 150,
    },
});

export default Splash;
