import React, { FC, useMemo, useReducer, createContext, useContext } from 'react';

export interface InitialCheckoutState {
	createOrderPayload: any;
	warrantyPayload: any;
	checkoutDetails: any;
}

const initialState: InitialCheckoutState = {
	createOrderPayload: null,
	warrantyPayload: null,
	checkoutDetails: null
};

type Action = {
	type:
		| 'STORE_CREATE_ORDER_PAYLOAD'
		| 'STORE_WARRANTY_PAYLOAD'
		| 'SET_MOP'
		| 'SET_MODE'
		| 'STORE_CHECKOUT_DETAILS';
	data?: any;
};

export const CheckoutContext = createContext<InitialCheckoutState | any>(initialState);

CheckoutContext.displayName = 'CheckoutContext';

function checkoutReducer(state: InitialCheckoutState, action: Action): InitialCheckoutState {
	switch (action.type) {
		case 'STORE_CREATE_ORDER_PAYLOAD':
			return {
				...state,
				createOrderPayload: action.data
			};

		case 'STORE_WARRANTY_PAYLOAD':
			return {
				...state,
				warrantyPayload: action.data
			};

		case 'STORE_CHECKOUT_DETAILS':
			return {
				...state,
				checkoutDetails: action.data
			};

		default:
			return state;
	}
}

export const CheckoutProvider: FC<{ children: React.ReactNode }> = (props) => {
	const [state, dispatch] = useReducer(checkoutReducer, initialState);

	const storeCreateOrderPayload: Actions.Checkout.StoreCreateOrderPayload = (data) => {
		dispatch({
			type: 'STORE_CREATE_ORDER_PAYLOAD',
			data
		});
	};

	const storeWarrantyPayload: Actions.Checkout.StoreWarrantyPayload = (data) => {
		dispatch({
			type: 'STORE_WARRANTY_PAYLOAD',
			data
		});
	};

	const setCheckoutDetails: Actions.Checkout.SetCheckoutDetails = (data) => {
		dispatch({
			type: 'STORE_CHECKOUT_DETAILS',
			data
		});
	};

	const value = useMemo(
		() => ({
			...state,
			storeCreateOrderPayload,
			storeWarrantyPayload,
			setCheckoutDetails
		}),
		[state]
	);

	return <CheckoutContext.Provider value={value} {...props} />;
};

export const useCheckoutContext = () => {
	const context = useContext(CheckoutContext);

	if (context === undefined) {
		throw new Error(`useCheckoutContext must be used within a CheckoutProvider`);
	}

	return context;
};

export const ManagedCheckoutContext: React.FC = ({ children }: any) => (
	<CheckoutProvider>{children}</CheckoutProvider>
);
