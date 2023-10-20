import React, { FC, useMemo, useReducer } from 'react';

export interface InitialState {
	cartData: ApiResponses.GetCartDataResponse;
	count: number;
	buyNowData: any;
}

const initialState = {
	cartData: [],
	count: 0,
	buyNowData: []
};

type Action =
	| {
			type: 'SET_CART_DATA';
			cartData: object;
	  }
	| {
			type: 'SET_CART_COUNT';
			count: number;
	  }
	| {
			type: 'BUY_NOW_DATA';
			buyNowData: any;
	  };

export const CartContext = React.createContext<InitialState | any>(initialState);

CartContext.displayName = 'CartContext';

function cartReducer(state: InitialState, action: Action) {
	switch (action.type) {
		case 'SET_CART_DATA': {
			return {
				...state,
				cartData: action.cartData
			};
		}

		case 'SET_CART_COUNT': {
			return {
				...state,
				count: action.count
			};
		}

		case 'BUY_NOW_DATA': {
			return {
				...state,
				buyNowData: action.buyNowData
			};
		}
	}
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, initialState);

	const setCartData: Actions.Cart.SetCartData = (cartData) =>
		dispatch({ type: 'SET_CART_DATA', cartData });

	const setCartCount: Actions.Cart.SetCartCount = (count) =>
		dispatch({ type: 'SET_CART_COUNT', count });

	const setBuyNowData: Actions.Cart.SetBuyNowData = (buyNowData: any) => {
		dispatch({ type: 'BUY_NOW_DATA', buyNowData });
	};

	const value = useMemo(
		() => ({
			...state,
			setCartData,
			setCartCount,
			setBuyNowData
		}),
		[state]
	);
	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
	const context = React.useContext(CartContext);
	if (context === undefined) {
		throw new Error(`useCart must be used within a CartProvider`);
	}
	return context;
};

// export const ManagedCartContext: React.FC = ({ children }) => (
// 	<CartProvider>{children}</CartProvider>
// );
