import React, { useRef } from 'react';
import { NavigationContainer, DefaultTheme as NavigationTheme } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider as ReduxProvider, useSelector, useDispatch } from 'react-redux';
import {
	PaperProvider,
	MD3LightTheme as DefaultTheme,
	configureFonts,
	Snackbar
} from 'react-native-paper';
import { LogBox, View, StyleSheet, Text } from 'react-native';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import store, { RootState } from '@slices/store';
import { Router } from '@routes/router.routes';
import { BaseFont, CustomColors, CustomFontVariants } from '@constants/index';
import { CustomModal } from '@atoms/index';
import Config from 'react-native-config';
import { UIProvider } from 'context/ui.context';
import { container } from '@helpers/index';
import { hideSnackbar } from '@slices/snackbar.slice';
import { FontGilroy } from '@primitives/index';

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

const toastConfig = {
	success: (props: any) => <BaseToast {...props} />,

	error: (props: any) => <ErrorToast {...props} />,

	gostor_type: ({ props }: any) => {
		return (
			<View style={styles.arzoooToastContainer}>
				<Text style={styles.arzoooToastMessage}>{props.msg}</Text>
			</View>
		);
	}
};

function MainContent() {
	const dispatch = useDispatch();
	const snackbar = useSelector((state: RootState) => state.snackbar);

	return (
		<>
			<Router />
			<Toast config={toastConfig} />
			<CustomModal />
			<Snackbar
				visible={snackbar.isVisible}
				onDismiss={() => dispatch(hideSnackbar())}
				duration={Snackbar.DURATION_SHORT}
				action={{
					label: snackbar.label ? snackbar.label : '',
					labelStyle: { fontSize: 12, fontFamily: FontGilroy.Light, color: '#FFF' }
				}}
			>
				{snackbar.message}
			</Snackbar>
		</>
	);
}

function App() {
	return (
		<ReduxProvider store={store}>
			<PaperProvider theme={{ ...theme, fonts }}>
				<QueryClientProvider client={queryClient}>
					<NavigationContainer theme={navTheme}>
						<GestureHandlerRootView style={{ ...container() }}>
							<BottomSheetModalProvider>
								<MainContent />
							</BottomSheetModalProvider>
						</GestureHandlerRootView>
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
		marginHorizontal: 10
	},
	arzoooToastMessage: {
		color: 'white' // Assuming white color for text on the dark background
	}
});

export default App;
