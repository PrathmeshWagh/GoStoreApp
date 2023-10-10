declare namespace CustomTypes {
	type BannerTypes = 'BANNER' | 'WITHOUT_BANNER';

	type BannerTagTypes = 'BRAND' | 'PRODUCT' | 'STORE' | 'CATEGORY' | 'LINK';

	type QueryKeys =
		| 'category'
		| 'categoryId'
		| 'brand'
		| 'storeId'
		| 'bannerId'
		| 'productIds'
		| 'searchQuery'
		| 'searchText'
		| 'store'
		| 'categoryId';

	type CategoryLevels = 'L1' | 'L0' | 'L2';

	type ParentBannerKeys = keyof typeof import('@/helpers/constants')['PARENT_BANNERS'];

	type ParentBannerStructure = {
		[k in ParentBannerKeys]?: Entities.ParentBanner;
	};

	type GenericObject = {
		[key: string]: any;
	};

	type UserDropdownMenuItem = {
		label: string;
		icon: React.ReactChild;
		path?: string;
		roles?: string[];
		hideOnKiosk?: boolean;
		showOnDevice?: string[];
		showAt?: string[];
		action?: () => void;
	};

	type ShopByDropdownMenuItem = {
		label: string;
		href: string;
	};

	type FilterCountKeys = 'brand' | 'price' | 'otherFilters' | 'category';

	type ProductQueryParams = {
		category?: string;
		categoryId?: string;
		clusterId?: string | number;
		state?: string;
		page?: number;
		pageSize?: number;
		brandArr?: Array<string>;
		// deliveryOptionsArr: Array<string>,
		priceFilter?: {
			minPrice?: number;
			maxPrice?: number;
		};
		sort?: string;
		// getCount?: boolean;
		storeId?: string;
		getStoreProducts?: boolean;
		productIds?: Array<string>;
		searchQuery?: string;
	};

	type ProductQueryFilters = {
		category?: string;
		brand?: string;
		minPrice?: number;
		maxPrice?: number;
		options?: string;
		sort_by?: string;
		page?: number;
		pageSize?: number;
		storeId?: number;
		productIds?: string;
		searchQuery?: string;
		deliveryOptions?: string;
		bluezooo_flag?: string;
		categoryId?: string;
		clusterId?: number;
		keepOrder?: boolean;
	};

	type ExchangeData = {
		brand: string[];
		condition: string[];
		'screen size'?: string[];
		type: string[];
		capacity?: string[];
		exchangeMaxPrice: number;
	};

	type ExchangeDiscountRequestKeys = {
		screenSize?: string;
		capacity?: string;
		type?: string;
		brand?: string;
		condition?: string;
	};

	type ExchangeDiscountRequestData = Partial<
		Record<keyof CustomTypes.ExchangeDiscountRequestKeys, string>
	>;

	type PrimaryBannerResponse = {
		status: String;
		data: ChildBanner[];
	};
}
