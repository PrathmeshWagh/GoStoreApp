import { configureStore } from '@reduxjs/toolkit';

import locationReducer from './location.slice';
import webviewUrlReducer from './webview-url.slice';

const store = configureStore({
    reducer: {
        location: locationReducer,
        urlWebview: webviewUrlReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
