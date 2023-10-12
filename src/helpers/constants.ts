export const LOCAL_STORAGE_KEYS = {
	ACCESS_TOKEN: 'ACCESS_TOKEN',
	REFRESH_TOKEN: 'REFRESH_TOKEN',
	LATITUDE: 'latitude',
	LONGITUDE: 'longitude',
	USER_LOCATION: 'USER_LOCATION',
	SHOW_LOCATION_MODAL: 'SHOW_LOCATION_MODAL',
	CART_TYPE: 'CART_TYPE'
} as const;

export const SORT_OPTIONS = [
	{ name: 'Recommendation', value: 'recommendation_asc' },
	{ name: 'Discount: High to Low', value: 'discount_desc' },
	{ name: 'Price: Low to High', value: 'price_asc' },
	{ name: 'Price: High to Low', value: 'price_desc' }
];
