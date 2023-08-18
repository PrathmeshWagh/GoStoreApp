import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import LottieView from 'lottie-react-native';

import { useTheme, useDimensions, useNavigation } from '@hooks/index';
import { RouteConstants } from 'routes/constants.routes';

const SplashScreen = () => {
    const { colors } = useTheme();
    const { width, height } = useDimensions();
    const { replace } = useNavigation();

    return (
        <View style={[styles.container, { backgroundColor: colors.primary, width, height }]}>
            <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
            <LottieView source={require('../../../assets/lottie/splash.json')}
                autoPlay
                loop={false}
                resizeMode="cover"
                style={styles.splash}
                onAnimationFinish={() => {
                    replace(RouteConstants.HomeScreenRoute);
                }}
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

export default SplashScreen;
