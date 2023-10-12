import { useMutation, useQuery } from 'react-query';
import { ApiEndpoints } from 'api/utils/api-endpoints.api';
import Config from 'react-native-config';

// import { LOCAL_STORAGE_KEYS, PER_PAGE } from '@/helpers/constants';
// import { useKiosk } from '@/atoms/Kiosk';
// import { getUserDetails } from '@/helpers/utils';
import axios from 'axios';

// const fetchFilters = async ({ queryKey }: any) => {
// 	const [_key, _params, _state, additionalParams = {}] = queryKey;
// 	let productData = {
// 		category: _params.category,
// 		categoryId: _params.categoryId,
// 		clusterId: _params.clusterId,
// 		state: _state,
// 		pageSize: PER_PAGE,
// 		brandArr: _params?.brand?.split(','),
// 		deliveryOptionsArr: _params?.deliveryOptions?.split(','),
// 		priceFilter: {
// 			minPrice: _params?.minPrice,
// 			maxPrice: _params?.maxPrice
// 		},
// 		filterObj: {
// 			...(_params?.options ? JSON.parse(_params?.options) : {}),
// 			...(_params?.latestFilterObj
// 				? {
// 						latestFilterObj: JSON.parse(decodeURIComponent(_params?.latestFilterObj))
// 				  }
// 				: {})
// 		},
// 		sort: _params?.sort_by,
// 		page: _params?.page ? _params?.page : 1,
// 		getCount: 'true',
// 		...(_params.storeId ? { storeId: _params.storeId, getStoreProducts: true } : {}),
// 		...(_params.productIds ? { productIds: _params.productIds.split(',') } : {}),
// 		...(_params.searchQuery ? { searchQuery: _params.searchQuery } : {})
// 	};
// 	const queryString = new URLSearchParams(additionalParams).toString();
// 	const { data } = await http.get(
// 		`${_key}?queryStr=${encodeURIComponent(JSON.stringify(productData))}&${queryString}`
// 	);
// 	return data;
// };

// const useFiltersQuery = (options, state: string, rootKey?: string | string[]) => {
// 	const { isKiosk } = useKiosk();
// 	const additionalParams = {
// 		isKiosk: rootKey === 'storeId' || isKiosk
// 	};
// 	const newOptions = {};
// 	const user = getUserDetails();
// 	if (isKiosk && user && ['WO_SELLER', 'WO_DISTRIBUTOR'].includes(user.role)) {
// 		newOptions['storeId'] = user.seller_id;
// 	}
// 	const { data, ...rest } = useQuery<any, Error>(
// 		[
// 			`${rootKey === 'storeId' ? '' : process.env.NEXT_PUBLIC_MAIN_INVENTORY}${
// 				API_ENDPOINTS.FILTERS
// 			}`,
// 			{ ...options, ...newOptions },
// 			state,
// 			additionalParams,
// 			{ enabled: !!options }
// 		],
// 		fetchFilters
// 	);
// 	if (data) {
// 		const savedPriceRange = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.PRICE_RANGE));
// 		const preventPriceRangeUpdate = localStorage.getItem(
// 			LOCAL_STORAGE_KEYS.PREVENT_PRICE_RANGE_UPDATE
// 		);
// 		localStorage.removeItem(LOCAL_STORAGE_KEYS.PREVENT_PRICE_RANGE_UPDATE);
// 		if (!preventPriceRangeUpdate && data.priceFilter) {
// 			localStorage.setItem(LOCAL_STORAGE_KEYS.PRICE_RANGE, JSON.stringify(data.priceFilter));
// 		}
// 		if (preventPriceRangeUpdate && savedPriceRange) {
// 			data.priceFilter = savedPriceRange;
// 		}
// 	}
// 	return { data, ...rest };
// };

interface Props {
	params?: {};
	productData?: CustomTypes.ProductQueryParams;
	rootKey?: any;
}

const fetchFiltersMutation = async ({ params, productData, rootKey }: Props) => {
	const queryString = new URLSearchParams(params).toString();

	const { data } = await axios.get(
		`${
			`${Config.BASE_PATH_INVENTORY}${ApiEndpoints.FILTERS}`
			// rootKey === 'storeId'
			// 	? `${process.env.NEXT_PUBLIC_MAIN}${ApiEndpoints.FILTERS_V1}`
			// 	: `${process.env.NEXT_PUBLIC_MAIN_INVENTORY}${ApiEndpoints.FILTERS}`
		}?queryStr=${encodeURIComponent(JSON.stringify(productData))}&${queryString}`
	);

	return data;
};

const useFiltersMutation = () => {
	return useMutation(fetchFiltersMutation);
};
export { useFiltersMutation };

// export { useFiltersQuery, fetchFilters, useFiltersMutation };
