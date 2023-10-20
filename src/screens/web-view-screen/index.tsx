import React, { useState, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { useSelector } from 'react-redux';
import { ActivityIndicator } from 'react-native-paper';

import { RootState } from '@slices/store';
import { useTheme } from '@hooks/index';
import { LayoutWrapper } from '@atoms/index';
import { centerBoth, container } from '@helpers/index';
import { DefaultStyles } from '@primitives/index';

const INJECTED_CODE =
	"let meta = document.createElement('meta'); meta.setAttribute('name', 'viewport'); meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'); document.getElementsByTagName('head')[0].appendChild(meta);";

const MainWebview = () => {
	const webViewRef = useRef<WebView>(null);
	const [canGoBack, setCanGoBack] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const { colors } = useTheme();
	const url = useSelector((state: RootState) => state.urlWebview.url);
	const auth = useSelector((state: RootState) => state.auth);

	let injectedJs = INJECTED_CODE;
	if (auth.loggedIn) {
		injectedJs += `
			(function() {
			let token = window.localStorage.getItem('ACCESS_TOKEN');
			if (!token || (token && token !== '${auth.token}')) {
				window.localStorage.setItem('ACCESS_TOKEN', '${auth.token}');
				window.localStorage.setItem('REFRESH_TOKEN', '${auth.refreshToken}');
				window.location.reload();
			}
			})();
		`;
	}

	const eventHandlers = async (event: any) => {
		try {
			const eventData = JSON.parse(event);
			switch (eventData.action) {
				case 'is_app':
					webViewRef.current?.postMessage(JSON.stringify({ action: 'is_app', response: 'true' }));
					break;
				default:
					return null;
			}
		} catch (err) {
			console.log('Webview: Failed to parse JSON', err);
		}
	};

	return (
		<LayoutWrapper>
			{/* <Button
                onPress={() => {
                    if (webViewRef.current) {
                        webViewRef.current.goBack();
                    }
                }}
            >
                Back
            </Button> */}
			<WebView
				ref={webViewRef}
				source={{ uri: url }}
				webviewDebuggingEnabled={true}
				style={styles.webview}
				onNavigationStateChange={(navState) => {
					setCanGoBack(navState.canGoBack);
				}}
				onLoadStart={() => setIsLoading(true)}
				onLoadEnd={() => setIsLoading(false)}
				javaScriptEnabled={true}
				injectedJavaScript={injectedJs}
				onMessage={(syntheticEvent) => {
					const { nativeEvent } = syntheticEvent;
					eventHandlers(nativeEvent.data);
				}}
			/>
			{isLoading && (
				<View style={styles.loaderContainer}>
					<ActivityIndicator size="small" color={colors.primary} />
				</View>
			)}
		</LayoutWrapper>
	);
};

const styles = StyleSheet.create({
	container: {
		...container(),
		marginTop: DefaultStyles.DefaultPadding + 6,
	},
	webview: {
		flex: 1,
		zIndex: 0,
	},
	loaderContainer: {
		...StyleSheet.absoluteFillObject,
		...centerBoth(),
		zIndex: 1,
		backgroundColor: 'rgba(255, 255, 255, 0.8)',
	},
});

export default MainWebview;
