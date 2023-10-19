import { configureStore } from '@reduxjs/toolkit';

import locationReducer from './location.slice';
import webviewUrlReducer from './webview.slice';
import modalReducer from './modal.slice';
import snackbarReducer from './snackbar.slice';
import authReducer from './auth.slice';
import cartReducer from './cart.slice';
import checkoutReducer  from './checkout.slice';


const store = configureStore({
	reducer: {
		auth: authReducer,
		location: locationReducer,
		urlWebview: webviewUrlReducer,
		modal: modalReducer,
		snackbar: snackbarReducer,
		cart: cartReducer,
		checkout:checkoutReducer
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
