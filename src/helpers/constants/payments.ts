export const modeOfPayment = 'RAZORPAY';

export const registeredEmail = 'gopay_support@arzooo.com';

export const paymentMethodsMapping = {
	NET_BANKING: 'netbanking',
	CREDIT_CARD: 'card',
	DEBIT_CARD: 'card',
	CARDLESS_EMI: 'cardless_emi',
	CREDIT_CARD_EMI: 'emi',
	EMI: 'emi',
	UPI: 'upi',
	WALLET: 'wallet',
	COD: 'cod',
	QR_SCAN: 'qr_scan'
};

export const paymentMethods = [
	{
		id: 'QR_SCAN',
		label: 'Scan and Pay',
		orderBy: 1
	},
	{
		id: 'NET_BANKING',
		label: 'Net banking',
		orderBy: 7
	},
	{
		id: 'CREDIT_CARD',
		label: 'Credit card',
		orderBy: 5
	},
	{
		id: 'DEBIT_CARD',
		label: 'Debit card',
		orderBy: 6
	},
	{
		id: 'CARDLESS_EMI',
		label: 'Card Less EMI',
		orderBy: 2
	},
	{
		id: 'CREDIT_CARD_EMI',
		label: 'Credit Card EMI',
		orderBy: 3
	},
	{
		id: 'UPI',
		label: 'UPI',
		orderBy: 4
	},
	// {
	//   id: 'WALLET',
	//   label: 'Wallet',
	//   orderBy: 8,
	// },
	{
		id: 'COD',
		label: 'Cash on delivery',
		orderBy: 0 //  9
	}
];

export const cardLessEMIProviders = [
	{
		id: 'walnut369',
		name: 'Axio'
	}
];

export const PAYMENT_RETRY_LIMIT = 5000; //  5 seconds

export const paymentStatuses = {
	PAYMENT_SUCCESS: 'PAYMENT_SUCCESS',
	PAYMENT_FAILED: 'PAYMENT_FAILED',
	PAYMENT_PENDING: 'PAYMENT_PENDING'
};

export const minOrderAmountForCarLessEMI = 5000;

export const PAYMENT_OPTIONS = {
	PREFERRED_PAYMENT_METHODS: {
		label: 'Preddereb Payment Methods',
		optins: [
			// {
			//   id: 'MASTER_CARD',
			//   card_number: '123456789012345',
			//   bank_name: 'HDFC',
			//   expiry_month: '1',
			//   expiry_year: '2022',
			// },
			// {
			//   id: 'VISA_CARD',
			//   card_number: '123456789012345',
			//   bank_name: 'HDFC',
			//   expiry_month: '1',
			//   expiry_year: '2022',
			// },
		]
	},
	UPI_APPS: {
		label: 'UPI Apps',
		options: [
			{
				id: 'GPAY',
				label: 'Gpay'
			},
			{
				id: 'PHONEPAY',
				label: 'PhonePe'
			},
			{
				id: 'PAYTM',
				label: 'Paytm'
			}
		]
	},
	CARDS: {
		label: 'Cards',
		options: [
			{
				id: 'CREDIT_CARD',
				label: 'Credit Card',
				description: 'Pay using Credit card',
				minPrice: '0',
				maxPrice: '9999999'
			},
			{
				id: 'DEBIT_CARD',
				label: 'Debit Card',
				description: 'Pay using Debit Card',
				minPrice: '0',
				maxPrice: '9999999'
			}
		]
	},
	PAY_LATER: [
		{
			id: 'CARDLESS_EMI',
			label: 'Card Less EMI',
			description: 'Choose from varius Pay Later options'
		}
		// {
		//   id: "",
		//   label: 'Flexipay',
		//   description: 'No cost EMI from your trusted bank',
		// },
	],
	OTHER_PAYMENT_OPTIONS: {
		label: 'Other Payment Options',
		options: [
			{
				id: 'EMI',
				label: 'EMI',
				description: 'Select from a list of EMI providers',
				minPrice: '1',
				maxPrice: '9999999'
			},
			{
				id: 'COD',
				label: 'Pay on delivery',
				description: 'Pay in cash or pay online',
				minPrice: '0',
				maxPrice: '30000'
			},
			{
				id: 'NET_BANKING',
				label: 'Net banking',
				description: 'Select from a list of banks',
				minPrice: '0',
				maxPrice: '9999999'
			}
			// {
			//   id: 'CREDIT_CARD_EMI',
			//   label: 'Credit Card EMI',
			//   description: 'Select from a list of Credit Cards',
			//   minPrice: '0',
			//   maxPrice: '9999999',
			// },
			// {
			//   id: 'CARDLESS_EMI',
			//   label: 'Card Less EMI',
			//   description: 'Select from a list of Credit Cards',
			//   minPrice: '0',
			//   maxPrice: '9999999',
			// },
			// {
			//   id: "WALLET",
			//   label: 'Wallet',
			//   description: 'Select from a list of banks',
			//   minPrice: '0',
			//   maxPrice: '9999999',
			// },
		]
	}
};

export const paymentMethodNames = {
	GPAY: 'Gpay',
	PHONEPAY: 'PhonePe',
	PAYTM: 'Paytm',
	CREDIT_CARD: 'Credit Card',
	DEBIT_CARD: 'Debit Card',
	walnut369: 'Axios',
	COD: 'Pay on delivery',
	NET_BANKING: 'Net banking',
	CREDIT_CARD_EMI: 'Credit Card EMI',
	CARDLESS_EMI: 'Card Less EMI',
	WALLET: 'Wallet',
	UPI: 'UPI',
	EMI: 'EMI'
};

export const payments = {
	MIN_PRICE_FOR_EMI_CALC: 5000,
	MIN_PRICE_PAY_WITH_EMI: 1000000
};
