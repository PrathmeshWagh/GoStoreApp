export const enum ApiEndpoints {
	CATEGORIES_CAROUSEL = '/categories',
	PARENTBANNERSTRUTURE = '/banners/v2/getParentBannersForConsumer',
	BANNERDETAILS = '/banners/v1/getBannersForConsumer',
	PRODUCTS = '/products/v2/getProducts',
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
	ALL_PRODUCTS = '/product/getAllProducts',
	EXCHANGE = '/gostor/cart/exchange',
	ADDRESS = '/gostor/addresses',
	CART_COUNT = '/gostor/v2/cart/count',
	ORDER_SUMMARY = '/gostor/orders/v2/summary',
	USER_PINCODE = '/locations/pincode',
	REFRESH_TOKEN = '/user/seller/refresh_token'
}
