declare namespace ApiResponses {
	type ApiResponse<Data> = { status: 'success' | 'error' } & Data;

	type TaggedBannerProductsResponse = ApiResponse<{
		data: { productId: number }[];
	}>;

	type GetProductsResponse = ApiResponse<{
		data: Entities.Product[];
		totalProducts: number;
	}>;

	type TaggedStoreDetailsResponse = ApiResponse<{
		data: {
			tagType: 'STORE';
			storeId: number;
			store: string;
			parentBannerId: number;
		}[];
	}>;

	type GetCategoriesResponse = ApiResponse<{
		data: Entities.CategoryNew[];
	}>;

	type GetStoreDetailsResponse = ApiResponse<{
		data: Entities.Store;
	}>;

	type SearchSuggestionsResponse = ApiResponse<{
		data: {
			suggestions: string[];
			products: Entities.SearchSuggestionProduct[];
		};
	}>;

	type BrandListResponse = ApiResponse<{
		data: Entities.Brand[];
	}>;

	type StoreListResponse = ApiResponse<{
		data: Entities.Store[];
	}>;

	type GetCartDataResponse = ApiResponse<Entities.CartData>;

	type GetCartCountResponse = ApiResponse<{
		data?:
			| any
			| {
					count?: number;
			  };
	}>;

	type fetchReferralCodeResponse = ApiResponse<{
		data: {
			referral_code: string;
		};
	}>;
	type fetchReferralDetailsResponse = ApiResponse<{
		data: {
			codeClaimed: boolean;
			rewards: {};
			rewardCouponPerc: number;
			rewardCouponMaxDiscount: number;
		};
	}>;
	type GetExchangeDiscountResponse = { discount: number };
	type OfferData = ApiResponse<{
		data: Entities.OffersData[];
	}>;
}
