import React from 'react';
import { NavigationContainer, DefaultTheme as NavigationTheme } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider as ReduxProvider } from 'react-redux';
import { PaperProvider, MD3LightTheme as DefaultTheme, configureFonts } from 'react-native-paper';

import store from '@slices/store';
import { Router } from '@routes/router.routes';
import { BaseFont, CustomColors, CustomFontVariants } from '@constants/index';

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

function App() {
	return (
		<ReduxProvider store={store}>
			<PaperProvider theme={{ ...theme, fonts }}>
				<QueryClientProvider client={queryClient}>
					<NavigationContainer theme={navTheme}>
						<Router/>
					</NavigationContainer>
				</QueryClientProvider>
			</PaperProvider>
		</ReduxProvider>
	);
}

export default App;
