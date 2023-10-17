import { createSlice } from '@reduxjs/toolkit';

type cartCount = {
	count: number;
	checkoutData: Array<any>;
	checkoutDetails: any;
};

const initialState: cartCount = {
	count: 0,
	checkoutData: [],
	checkoutDetails: null
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		cartCount: (state, action) => {
			return { ...state, ...action.payload };
		},
		checkOutData: (state, action) => {
			return { ...state, checkoutData: action.payload };
		},
		checkOutDetails: (state, action) => {
			return { ...state, checkoutDetails: action.payload };
		}
	}
});

export const { cartCount, checkOutData, checkOutDetails } = cartSlice.actions;
export default cartSlice.reducer;
