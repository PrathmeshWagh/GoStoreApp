import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';

import { useLocalstorage } from '@hooks/index';

type AuthState = {
    loading: boolean;
    loggedIn: boolean;
    token?: string;
    username?: string;
    user_id?: number;
    seller_id?: number;
    name?: string;
    phone_number?: number;
    email?: string;
    store_type?: string;
    store_category?: string;
    zone?: string;
    credit_payment?: 0 | 1,
    cod_payment?: string;
    pad_payment?: string;
    indifi_id?: string;
    role?: string;
    district_id?: number;
    pincode?: number;
    iat?: number;
    exp?: number;
    refreshToken?: string;
};

const initialState: AuthState = {
    loading: false,
    loggedIn : false,
};

type AuthenticatePayload = {
    token: string;
    refreshToken: string;
    navigateFunction: () => void;
};

export const authenticateUser = createAsyncThunk(
    'auth/authenticateUser',
    async ({ token, refreshToken, navigateFunction }: AuthenticatePayload, { dispatch }) => {
        const { saveToken } = useLocalstorage();
        saveToken(token, refreshToken);
        const userDetails = jwtDecode(token);
        dispatch(updateUser({
            loggedIn: true,
            refreshToken: refreshToken,
            ...userDetails as Partial<AuthState>,
        }));
        navigateFunction();
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateUser: (state, action: PayloadAction<Partial<AuthState>>) => {
            return {
                ...state,
                ...action.payload,
            };
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
    },
     extraReducers: (builder) => {
        builder.addCase(authenticateUser.fulfilled, () => {
            // Handle any side-effects of a successful authentication here
        });
    },
});

export const { updateUser, setToken } = authSlice.actions;

export default authSlice.reducer;
