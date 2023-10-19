import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RouteConstants } from '@routes/constants.routes';

type UIState = {
    //did any bcz dont have an interface to all routes
    loginRedirect: any;
};

const initialState: UIState = {
    loginRedirect: RouteConstants.TabsScreenRoute,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        updateLoginRedirect: (state, action: PayloadAction<Partial<UIState>>) => {
            return { ...state, ...action.payload };
        },
    },
});

export const { updateLoginRedirect } = uiSlice.actions;

export default uiSlice.reducer;

