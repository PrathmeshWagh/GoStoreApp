export const enum ApiEndpoints {
	Categories = '/categories',
	ParentBannerStruture = '/banners/v2/getParentBannersForConsumer',
	BannerDetails = '/banners/v1/getBannersForConsumer',
	Products = '/products/v2/getProducts',
	LOGIN = '/user/seller/login',
	GENERATE_OTP = '/user/seller/generateOtp',
	GET_PRODUCTS = '/products/v2/getProducts',
	PRODUCT = '/products/v2/productDetail',
	CHECK_PINCODE_SERVICEABILITY = '/products/v1/getServiceability',
	STORES = '/gostor/stores',
	ASSURED_BUYBACK_PLAN_DETAILS = '/abb/plan-details',
	EXCHANGE_PINCODE = '/exchange/serviceability/',
	COUPONS = '/coupon/v1',
	BANK_OFFERS = 'transactions/v2/offers',
	CATEGORIES = '/products/v2/categories',
	CATEGORIES_V1 = '/products/v1/categories',
	ALL_PRODUCTS = '/product/getAllProducts'
}
