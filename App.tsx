import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider as ReduxProvider } from 'react-redux';
import { PaperProvider } from 'react-native-paper';

import store from '@context/store';
import { Router } from '@routes/router.routes';

const queryClient = new QueryClient();

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
					<NavigationContainer theme={theme}>
						<Router/>
					</NavigationContainer>
				</QueryClientProvider>
			</PaperProvider>
		</ReduxProvider>
	);
}

export default App;
