import React, { useState, useRef } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { useSelector } from 'react-redux';
import { ActivityIndicator, Button } from 'react-native-paper';

import { RootState } from '@slices/store';
import { useTheme } from '@hooks/index';

const MainWebview = () => {
    const webViewRef = useRef<WebView>(null);
    const [canGoBack, setCanGoBack] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { colors } = useTheme();
    const url = useSelector((state: RootState) => state.urlWebview.url);

    return (
        <SafeAreaView style={styles.container}>
            <Button
                onPress={() => {
                    if (webViewRef.current) {
                        webViewRef.current.goBack();
                    }
                }}
            >
                Back
            </Button>

            <WebView
                ref={webViewRef}
                source={{ uri: url }}
                style={styles.webview}
                onNavigationStateChange={navState => {
                    setCanGoBack(navState.canGoBack);
                }}
                onLoadStart={() => setIsLoading(true)}
                onLoadEnd={() => setIsLoading(false)}
            />

            {isLoading && (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="small" color={colors.primary} />
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    webview: {
        flex: 1,
        zIndex: 0,
    },
    loaderContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
});

export default MainWebview;
