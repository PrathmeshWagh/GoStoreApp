declare namespace Actions.Cart {
	type SetCartData = (cartData: ApiResponses.GetCartDataResponse) => void;
	type SetCartCount = (count: number) => void;
	type SetBuyNowData = (buyNowData: any) => void;

	type CartActions = {
		setCartData: SetCartData;
		setCartCount: SetCartCount;
		setBuyNowData: SetBuyNowData;
	};
}
