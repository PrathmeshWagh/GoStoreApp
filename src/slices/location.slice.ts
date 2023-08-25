// counterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type LocationState = {
    city: string;
    cluster_id: number;
    pincode: number;
    state: string;
};

const initialState: LocationState = {
    city: 'Bengaluru',
    cluster_id : 1,
    state: 'Karnataka',
    pincode: 560103,
};

const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        // setLocation: (state) => {
        //     state.message = "hi";
        // },
        updateLocation: (state, action: PayloadAction<Partial<LocationState>>) => {
            return { ...state, ...action.payload };
        },
    },
});

export const { updateLocation } = locationSlice.actions;

export default locationSlice.reducer;

