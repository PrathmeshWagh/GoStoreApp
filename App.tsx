import React, { useRef } from 'react';
import { NavigationContainer, DefaultTheme as NavigationTheme } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider as ReduxProvider } from 'react-redux';
import { PaperProvider, MD3LightTheme as DefaultTheme, configureFonts } from 'react-native-paper';
import { LogBox } from 'react-native';

import store from '@slices/store';
import { Router } from '@routes/router.routes';
import { BaseFont, CustomColors, CustomFontVariants } from '@constants/index';
import { CustomModal } from '@atoms/index';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import Config from 'react-native-config';
import { View, Text } from 'react-native';
import { UIProvider } from 'context/ui.context';

const toastConfig = {
	success: (props: any) => <BaseToast {...props} />,

	error: (props: any) => <ErrorToast {...props} />,

	gostor_type: ({ props }: any) => (
		<View
			style={{
				backgroundColor: 'rgba(0, 0, 0, 0.8)',
				paddingHorizontal: 15,
				paddingVertical: 10,
				borderRadius: 20,
				marginHorizontal: 10
			}}
		>
			{/* <TextFile style={{color: '#FFF'}}>{props.msg}</TextFile> */}
			<Text style={{ color: '#FFF' }}>{props.msg}</Text>
		</View>
	)
};

LogBox.ignoreLogs([]);

const queryClient = new QueryClient();

/** Paper Provider Theme */
const baseFont = { fontFamily: BaseFont.fontFamily } as const;

const baseVariants = configureFonts({ config: baseFont });

const theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		...CustomColors
	}
};

const fonts = configureFonts({
	config: {
		...baseVariants,
		...CustomFontVariants
	}
});

/** React Navigation Theme */
const navTheme = {
	...NavigationTheme,
	colors: {
		...NavigationTheme.colors,
		...CustomColors
	}
};

function App() {
	return (
		<ReduxProvider store={store}>
			<PaperProvider theme={{ ...theme, fonts }}>
				<QueryClientProvider client={queryClient}>
					<NavigationContainer theme={navTheme}>
						{/* <UIProvider> */}
						<Router />
						<Toast
							config={toastConfig}
							// ref={(ref: any) => Toast.setRef(ref)}
							visibilityTime={2000}
						/>
						<CustomModal />
						{/* </UIProvider> */}
					</NavigationContainer>
				</QueryClientProvider>
			</PaperProvider>
		</ReduxProvider>
	);
}

export default App;
