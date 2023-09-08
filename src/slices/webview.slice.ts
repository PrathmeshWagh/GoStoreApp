import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UrlState = {
    url: string;
    auth: boolean;
};

const initialState: UrlState = {
    url: '',
    auth: false,
};

const urlWebviewSlice = createSlice({
    name: 'url-webview',
    initialState,
    reducers: {
        updateUrl: (state, action: PayloadAction<{ url: string }>) => {
            state.url = action.payload.url;
        },
        updateAuth: (state, action: PayloadAction<{ auth: boolean }>) => {
            state.auth = action.payload.auth;
        },
    },
});

export const { updateUrl, updateAuth } = urlWebviewSlice.actions;

export default urlWebviewSlice.reducer;
