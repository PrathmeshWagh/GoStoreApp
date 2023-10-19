import { createSlice } from '@reduxjs/toolkit';

type checkout= {
	count: number;
	checkoutData: Array<any>;
	checkoutDetails: any;
};

const initialState: checkout = {
	count: 0,
	checkoutData: [],
	checkoutDetails: null
};

const checkoutSlice = createSlice({
	name: 'checkoutSlice',
	initialState,
	reducers: {
		cartCount: (state, action) => {
			return { ...state, ...action.payload };
		},
		checkOutData: (state, action) => {
			return { ...state, checkoutData: action.payload.checkoutData };
		},
		checkOutDetails: (state, action) => {
			return { ...state, checkoutDetails: action.payload };
		}
	}
});

export const { cartCount, checkOutData, checkOutDetails } = checkoutSlice.actions;
export default checkoutSlice.reducer;
