import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider as ReduxProvider } from 'react-redux';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { Text, View } from 'react-native';
import { PaperProvider, MD3LightTheme as DefaultTheme } from 'react-native-paper';

import store from './src/context/store';
import { FontGilroy } from '@/primitives/index';

const queryClient = new QueryClient();

const toastConfig = {
	// eslint-disable-next-line react/react-in-jsx-scope
	success: (props: any) => <BaseToast {...props} />,

	// eslint-disable-next-line react/react-in-jsx-scope
	error: (props: any) => <ErrorToast {...props} />,

	arzooo_type: ({ props }: any) => (
		// eslint-disable-next-line react/react-in-jsx-scope
		<View
			// eslint-disable-next-line react-native/no-inline-styles
			style={{
				backgroundColor: 'rgba(0, 0, 0, 0.8)',
				paddingHorizontal: 15,
				paddingVertical: 10,
				borderRadius: 20,
				marginHorizontal: 10,
			}}
		>
			<Text>
				{ props.msg }
			</Text>
		</View>
	),
};

const theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: '#3a9545',
		secondary: '#000000',
	},
};

function App() {
	return (
		<ReduxProvider store={store}>
			<PaperProvider theme={theme}>
				<QueryClientProvider client={queryClient}>
					<NavigationContainer>
						<Toast
							config={toastConfig}
							visibilityTime={2000}
						/>
						<Text style={{ marginTop: 100, fontFamily: FontGilroy.Light, fontSize: 30 }}>
						abcd 1234
						</Text>
						<Text style={{ marginTop: 100, fontFamily: FontGilroy.Thin, fontSize: 30 }}>
						abcd 1234
						</Text>
					</NavigationContainer>
				</QueryClientProvider>
			</PaperProvider>
		</ReduxProvider>
	);
}

export default App;
