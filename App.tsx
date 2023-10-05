import React from 'react';
import { NavigationContainer, DefaultTheme as NavigationTheme } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider as ReduxProvider } from 'react-redux';
import { PaperProvider, MD3LightTheme as DefaultTheme, configureFonts, Text } from 'react-native-paper';
import { LogBox, View, StyleSheet } from 'react-native';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

import store from '@slices/store';
import { Router } from '@routes/router.routes';
import { BaseFont, CustomColors, CustomFontVariants } from '@constants/index';
import { CustomModal } from '@atoms/index';

LogBox.ignoreLogs([]);

const queryClient = new QueryClient();

/** Paper Provider Theme */
const baseFont = { fontFamily: BaseFont.fontFamily } as const;

const baseVariants = configureFonts({ config: baseFont });

const theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		...CustomColors,
	},
};

const fonts = configureFonts({
    config: {
		...baseVariants,
		...CustomFontVariants,
    },
});

/** React Navigation Theme */
const navTheme = {
	...NavigationTheme,
	colors: {
		...NavigationTheme.colors,
		...CustomColors,
	},
};

const toastConfig = {
    success: (props: any) => <BaseToast {...props} />,

    error: (props: any) => <ErrorToast {...props} />,

    gostor_type: ({ props }: any) => {
		return (
			<View style={styles.arzoooToastContainer}>
				<Text style={styles.arzoooToastMessage}>{props.msg}</Text>
			</View>
		);
	},
};

function App() {
	return (
		<ReduxProvider store={store}>
			<PaperProvider theme={{ ...theme, fonts }}>
				<QueryClientProvider client={queryClient}>
					<NavigationContainer theme={navTheme}>
						<Router/>
						<Toast config={toastConfig} />
						<CustomModal/>
					</NavigationContainer>
				</QueryClientProvider>
			</PaperProvider>
		</ReduxProvider>
	);
}

const styles = StyleSheet.create({
    arzoooToastContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 20,
        marginHorizontal: 10,
    },
    arzoooToastMessage: {
        color: 'white',  // Assuming white color for text on the dark background
    },
});

export default App;
