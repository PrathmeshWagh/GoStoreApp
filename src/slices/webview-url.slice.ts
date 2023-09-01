import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UrlState = {
    url: string;
};

const initialState: UrlState = {
    url: '',
};

const urlWebviewSlice = createSlice({
    name: 'url-webview',
    initialState,
    reducers: {
        updateUrl: (state, action: PayloadAction<{ url: string }>) => {
            state.url = action.payload.url;
        },
    },
});

export const { updateUrl } = urlWebviewSlice.actions;

export default urlWebviewSlice.reducer;
