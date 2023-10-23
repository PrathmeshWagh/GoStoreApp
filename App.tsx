import React from 'react';
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
import ReactMoE from 'react-native-moengage';
import Config from 'react-native-config';
import { Mixpanel } from 'mixpanel-react-native';
import firebase from '@react-native-firebase/app';

import store, { RootState } from '@slices/store';
import { Router } from '@routes/router.routes';
import { BaseFont, CustomColors, CustomFontVariants } from '@constants/index';
import { CustomModal } from '@atoms/index';
import { container } from '@helpers/index';
import { hideSnackbar } from '@slices/snackbar.slice';
import { FontGilroy } from '@primitives/index';
import { linking } from '@routes/linking.routes';
import { config, credentials } from '@services/firebase.service';
// import { defaultAppConfig } from 'services/firebase.service';
import { MenuProvider } from 'react-native-popup-menu';

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

// try {

//  if (!firebase.apps.length) {
//         firebase.initializeApp(defaultAppConfig);
//     }

//     // if (!firebase2.apps.some(app => app.name === 'secondary')) {
//     //     firebase2.initializeApp(defaultAppConfig);
//     // }
// } catch (error) {
//     console.error("Firebase initialization error:", error);
// }

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
	firebase.initializeApp(credentials, config);

	return (
		<>
			<Router />
			<Toast config={toastConfig} visibilityTime={2000} />
			<CustomModal />
			<Snackbar
				visible={snackbar.isVisible}
				onDismiss={() => dispatch(hideSnackbar())}
				duration={Snackbar.DURATION_SHORT}
				action={{
					label: snackbar.label ? snackbar.label : '',
					labelStyle: { fontSize: 12, fontFamily: FontGilroy.Light, color: '#FFF' },
					onPress: snackbar.onPress ? snackbar.onPress : () => dispatch(hideSnackbar()),
				}}
			>
				{snackbar.message}
			</Snackbar>
		</>
	);
}

function App() {
	const trackAutomaticEvents = true;
	const mixpanel = new Mixpanel(Config.BASE_MIX_PANEL_ID as string, trackAutomaticEvents);
	mixpanel.init();
	ReactMoE.initialize(Config.BASE_MOENGAGE_ID as string);

	return (
<<<<<<< HEAD
		<ReduxProvider store={store}>
			<PaperProvider theme={{ ...theme, fonts }}>
				<QueryClientProvider client={queryClient}>
					<NavigationContainer
						theme={navTheme}
						linking={linking}
					>
						<GestureHandlerRootView style={{ ...container() }}>
							<BottomSheetModalProvider>
								<MainContent />
							</BottomSheetModalProvider>
						</GestureHandlerRootView>
					</NavigationContainer>
				</QueryClientProvider>
			</PaperProvider>
		</ReduxProvider>
=======
		<MenuProvider>
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
		</MenuProvider>
>>>>>>> bed309dd03095916498dd55f2f14c39697cea35f
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
		color: 'white'
	}
});

export default App;
