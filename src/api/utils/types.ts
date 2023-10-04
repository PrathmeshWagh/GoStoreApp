export type LoginType = {
	token: any;
};

export interface LoginInputType {
	mobile: string;
	otp: string;
	isNewUser?: boolean;
}

export interface LoginMutationType {
	redirectUrl?: string;
}

export interface RegisterInputType {
	mobile: string;
	otp?: string;
	name?: string;
	email?: string;
	referralCode?: string;
}

export interface AddressTypePost {
	name: string;
	address: string;
	pincode: number;
	phone: string;
	email?: string;
}

export interface QSSubcategoryType {
	category: string;
	id: number;
	subcat: string;
}

export interface clpType {
	page: number;
	pageSize: number;
	category: string;
	city: string;
	brandArr: object;
	filterObj: object;
	priceFilter: {
		minPrice: string;
		maxPrice: string;
	};
}

export interface AddressType {
	address: string;
	address_id: number;
	city: string;
	district: string;
	name: string;
	phone: number;
	pincode: number;
	state: string;
}

export interface PaymentOptions {
	order_id: number;
	payable_amount: number;
	payment_methods: Array<string>;
	shipment_charges: number;
	total_amount: number;
	total_discount: number;
}

export interface AddRemoveCart {
	product_id?: any;
	productId?: any;
	quantity: number;
	price?: any;
	type?: any;
}

export interface RemoveFromCart {
	productId: any;
	remarks: string;
}

export interface RemoveExchange {
	productId: any;
	cta: string;
}

export interface FilterType {
	attribute_id: number;
	attribute_name: string;
	filter_option: string;
}

export interface CreateOrderType {
	cta: string;
	shippingAddressId: string;
	billingAddressId: string;
	paymentId?: string;
}

export interface CreatePaymentType {
	orderId: string;
	mop: string;
}

export interface OrderType {
	additionalShipmentDetails?: any;
	quantity: number;
	category: string;
	currentStatus: string;
	displayName: string;
	modelName: string;
	orderDate: string;
	orderId: number;
	orderValue: number;
	shipmentId: number;
	image: string;
	latestStatusUpdatedAt?: Date;
	isReturnEligible?: number;
	itemCount?: number;
	deliveryDateRange?: any;
	statusToDisplay?: string;
	isCancellationAllowed?: boolean;
	displayImage?: string;
	buyingPrice?: string;
	priceBreakup?: {
		mrp: number;
	};
}

export interface BannerDetailsType {
	bannerName: string;
	bannerType: string;
	colourCode: string;
	parentBannerId: number;
	sequence: number;
	tagType: string;
}

export interface BannerChildType {
	childBannerId: number;
	clickable: boolean;
	endTime: string;
	imgSequence: number;
	imgs: Array<BannerChildImageType>;
	parentBannerId: number;
	startTime: string;
	tagType: string;
}

export interface BannerChildImageType {
	imgId: number;
	imgPath: string;
	imgPosition: string;
}

export interface OrderCancelType {
	orderId: number;
	shipmentId: number;
	remarks?: string;
}

export interface OrderReturnType {
	orderId: number;
	shipmentId: number;
	reason: string;
}

export interface AddressRemoveType {
	addressId: number;
}

export interface EarlyAccessType {
	phone: number;
	optedWhatsapp: boolean;
}

export interface ValidateReferralCodeType {
	code: string;
}
export interface PriceDemandPostType {
	detail: string;
	state: string;
	clusterId?: string | number;
}
export interface PartnerWithUsType {
	phone_number: number;
	name: string;
	store_name: string;
	city: string;
}
export interface Subscription {
	email: string;
}

export interface GetProduct {
	params?: any;
	productData?: CustomTypes.ProductQueryParams;
	rootKey?: any;
}
