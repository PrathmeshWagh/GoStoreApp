import { AddressType, PaymentOptions } from 'api/utils/types';
import React, { FC, useMemo, useReducer } from 'react';

export interface State {
	addressId: number;
	showAddress: boolean;
	editAddress: AddressType;
	selectedAddress: any;
	createOrderErrorData: any;
	isEdit: boolean;
	checkoutData: Array<any>;
	mop: string;
	mode: string;
	activePayment: string;
	emiPlans: any;
	walletCodes: any;
	walletDetails: any;
	netBankingCodes: any;
	netBankValue: string;
	cardDetails: {
		cardHolder: string;
		cardNumber: string;
		cvv: string;
		month: string;
		year: string;
	};
	paymentOptions: PaymentOptions;
	razorpayOptions: any;
	coupon: any;
	credits: any;
}

const initialState = {
	addressId: null,
	showAddress: true,
	editAddress: {},
	selectedAddress: {},
	createOrderErrorData: null,
	isEdit: false,
	checkoutData: [],
	mop: null,
	mode: null,
	activePayment: null,
	emiPlans: {},
	walletCodes: {},
	walletDetails: {
		code: ''
	},
	netBankingCodes: {},
	netBankValue: null,
	cardDetails: {
		cardHolder: '',
		cardNumber: '',
		cvv: '',
		month: '',
		year: ''
	},
	emiCardDetails: {
		cardHolder: '',
		cardNumber: '',
		cvv: '',
		month: '',
		year: '',
		plan: ''
	},
	paymentOptions: {
		order_id: null,
		payable_amount: null,
		payment_methods: [],
		shipment_charges: null,
		total_amount: null,
		total_discount: null
	},
	razorpayOptions: {},
	upiDetails: {
		vpa: ''
	},
	coupon: {
		data: null,
		error: null
	},
	credits: {
		applied: false,
		amount: 0
	},
	payLater: null
};

type Action =
	| {
			type: 'UPDATE_ADDRESS';
			addressId: number;
	  }
	| {
			type: 'SHOW_ADDRESS';
	  }
	| {
			type: 'HIDE_ADDRESS';
	  }
	| {
			type: 'CHECKOUT_DATA';
			checkoutData: [];
	  }
	| {
			type: 'UPDATE_CHECKOUT_DATA';
			checkoutData: {};
	  }
	| {
			type: 'BANK_VALUE';
			netBankValue: null;
	  }
	| {
			type: 'MOP';
			mop: null;
	  }
	| {
			type: 'MODE';
			mode: null;
	  }
	| {
			type: 'ACTIVE_PAYMENT';
			activePayment: null;
	  }
	| {
			type: 'EMI_PLANS';
			emiPlans: {};
	  }
	| {
			type: 'WALLET_CODES';
			walletCodes: {};
	  }
	| {
			type: 'WALLET_VALUE';
			walletDetails: {
				code: '';
			};
	  }
	| {
			type: 'NETBANKING_CODES';
			netBankingCodes: {};
	  }
	| {
			type: 'CARD_DETAILS';
			cardDetails: {};
	  }
	| {
			type: 'EMI_CARD_DETAILS';
			emiCardDetails: {};
	  }
	| {
			type: 'PAYMENT_OPTIONS';
			paymentOptions: PaymentOptions;
	  }
	| {
			type: 'RAZORPAY_OPTIONS';
			razorpayOptions: any;
	  }
	| {
			type: 'EDIT_ADDRESS';
			editAddress: {};
	  }
	| {
			type: 'SELECTED_ADDRESS';
			selectedAddress: {};
	  }
	| {
			type: 'CREATE_ORDER_ERROR';
			createOrderErrorData: null;
	  }
	| {
			type: 'UPI_DETAILS';
			vpa: {};
	  }
	| {
			type: 'COUPON_SUCCESS';
			coupon: {};
	  }
	| {
			type: 'COUPON_REMOVE';
	  }
	| {
			type: 'COUPON_ERROR';
			coupon: {};
	  }
	| {
			type: 'APPLY_GOSTOR_CREDITS';
			credits: {};
	  }
	| {
			type: 'PAY_LATER';
			payLater: null;
	  };

export const CheckoutContext = React.createContext<State | any>(initialState);

CheckoutContext.displayName = 'CheckoutContext';

function checkoutReducer(state: State, action: Action) {
	switch (action.type) {
		case 'UPDATE_ADDRESS': {
			return {
				...state,
				addressId: action.addressId
			};
		}
		case 'SHOW_ADDRESS': {
			return {
				...state,
				showAddress: true
			};
		}
		case 'HIDE_ADDRESS': {
			return {
				...state,
				showAddress: false,
				isEdit: false
			};
		}
		case 'EDIT_ADDRESS': {
			return {
				...state,
				editAddress: action.editAddress,
				isEdit: true
			};
		}
		case 'SELECTED_ADDRESS': {
			return {
				...state,
				selectedAddress: action.selectedAddress,
				isEdit: false
			};
		}
		case 'CREATE_ORDER_ERROR': {
			return {
				...state,
				createOrderErrorData: action.createOrderErrorData,
				isEdit: false
			};
		}
		case 'CHECKOUT_DATA': {
			return {
				...state,
				checkoutData: action.checkoutData
			};
		}
		case 'UPDATE_CHECKOUT_DATA': {
			return {
				...state,
				checkoutData: { ...state.checkoutData, ...action.checkoutData }
			};
		}
		case 'MOP': {
			return {
				...state,
				mop: action.mop
			};
		}
		case 'MODE': {
			return {
				...state,
				mode: action.mode
			};
		}
		case 'ACTIVE_PAYMENT': {
			return {
				...state,
				activePayment: action.activePayment
			};
		}
		case 'EMI_PLANS': {
			return {
				...state,
				emiPlans: action.emiPlans
			};
		}
		case 'WALLET_CODES': {
			return {
				...state,
				walletCodes: action.walletCodes
			};
		}
		case 'WALLET_VALUE': {
			return {
				...state,
				walletDetails: action.walletDetails
			};
		}
		case 'NETBANKING_CODES': {
			return {
				...state,
				netBankingCodes: action.netBankingCodes
			};
		}
		case 'BANK_VALUE': {
			return {
				...state,
				netBankValue: action.netBankValue
			};
		}
		case 'CARD_DETAILS': {
			return {
				...state,
				cardDetails: action.cardDetails
			};
		}
		case 'EMI_CARD_DETAILS': {
			return {
				...state,
				emiCardDetails: action.emiCardDetails
			};
		}
		case 'PAYMENT_OPTIONS': {
			return {
				...state,
				paymentOptions: action.paymentOptions
			};
		}
		case 'RAZORPAY_OPTIONS': {
			return {
				...state,
				razorpayOptions: action.razorpayOptions
			};
		}
		case 'UPI_DETAILS': {
			return {
				...state,
				upiDetails: { vpa: action.vpa }
			};
		}
		case 'COUPON_SUCCESS': {
			return {
				...state,
				coupon: { data: action.coupon, error: null }
			};
		}
		case 'COUPON_REMOVE': {
			return {
				...state,
				coupon: { data: null, error: null }
			};
		}
		case 'COUPON_ERROR': {
			return {
				...state,
				coupon: { data: null, error: action.coupon }
			};
		}
		case 'APPLY_GOSTOR_CREDITS': {
			return {
				...state,
				credits: action.credits
			};
		}
		case 'PAY_LATER': {
			return {
				...state,
				payLater: action.payLater
			};
		}
	}
}

export const CheckoutProvider: FC<{ children: React.ReactNode }> = (props) => {
	const [state, dispatch] = useReducer(checkoutReducer, initialState);

	const setUpdatedAddress = (addressId) => dispatch({ type: 'UPDATE_ADDRESS', addressId });

	const value = useMemo(
		() => ({
			...state,
			setUpdatedAddress
		}),
		[state]
	);
	return <CheckoutContext.Provider value={value} {...props} />;
};

export const useCheckout = () => {
	const context = React.useContext(CheckoutContext);
	if (context === undefined) {
		throw new Error(`useQS must be used within a QSProvider`);
	}
	return context;
};

export const ManagedCheckoutContext: React.FC = ({ children }: any) => (
	<CheckoutProvider>{children}</CheckoutProvider>
);
