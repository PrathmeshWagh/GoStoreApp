declare namespace Actions.Checkout {
	type StoreCreateOrderPayload = (data: any) => void;
	type StoreWarrantyPayload = (data: any) => void;
	type SetCheckoutDetails = (data: any) => void;

	type CheckoutActions = {
		storeCreateOrderPayload: StoreCreateOrderPayload;
		storeWarrantyPayload: StoreWarrantyPayload;
		setCheckoutDetails: SetCheckoutDetails;
	};
}
