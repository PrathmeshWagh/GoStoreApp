import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SnackbarState = {
    isVisible: boolean,
    message: string,
    label?: string
};

const initialState: SnackbarState = {
    isVisible: false,
    message: '',
    label: 'Close',
};

const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState,
    reducers: {
        showSnackbar: (state, action: PayloadAction<{ message: string, label?: string }>) => {
            state.isVisible = true;
            state.message = action.payload.message;
            state.label = action.payload.label;
        },
        hideSnackbar: (state) => {
            state.isVisible = false;
            state.message = '';
        },
    },
});

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
