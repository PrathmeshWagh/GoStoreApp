import { createSlice } from '@reduxjs/toolkit';

type cartCount = {
	count: number;
	cartData: any[];
	buyNowData: Array<any>;
};

const initialState: cartCount = {
	cartData: [],
	count: 0,
	buyNowData: []
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action) => {
			const newItem = action.payload;
			const existingItem = state.cartData.find((item) => item.id === newItem.id);

			if (existingItem) {
				return (existingItem.cartQuantity += 1);
			} else {
				return state.cartData.push(newItem);
			}
		},
		removeFromCart: (state, action) => {
			const itemToRemove = action.payload;
			state.cartData = state.cartData.filter((item) => item.id !== itemToRemove);
		},
		cartCount: (state, action) => {
			return { ...state, ...action.payload };
		},
		buyNowData: (state, action) => {
			return { ...state, buyNowData: action.payload };
		},
		cartData: (state, action) => {
			return { ...state, cartData: action.payload };
		}
	}
});

export const { addToCart, removeFromCart, cartCount, cartData } = cartSlice.actions;
export default cartSlice.reducer;
