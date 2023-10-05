import { useInfiniteQuery } from 'react-query';
import Config from 'react-native-config';
import { ApiEndpoints } from 'api/utils/api-endpoints.api';
import axios from 'axios';
// import http from '@/api/utils/http';
import { PER_PAGE } from 'helpers';
import useKiosk from 'components/atoms/Kiosk/useKiosk.hook';
// import { getUserDetails } from '@/helpers/utils';

const fetchInfiniteProducts = async ({ pageParam = 1, queryKey }: any) => {
	const [_key, _params, _state, additionalParams = {}] = queryKey;

	let productData = {
		category: _params.category,
		categoryId: _params.categoryId,
		clusterId: _params.clusterId,
		state: _state,
		pageSize: PER_PAGE,
		brandArr: 'OnePlus',
		priceFilter: {
			minPrice: _params?.minPrice,
			maxPrice: _params?.maxPrice
		},
		filterObj: _params?.options ? JSON.parse(_params?.options) : {},
		sort: _params?.sort_by,
		page: pageParam,
		...(_params.storeId ? { storeId: _params.storeId, getStoreProducts: true } : {}),
		...(_params.productIds ? { productIds: _params.productIds.split(',') } : {}),
		...(_params.searchQuery ? { searchQuery: _params.searchQuery } : {}),
		showBluezooo:
			_params.showBluezooo === 'true' ? true : _params.showBluezooo === 'false' ? false : null
	};

	const queryString = new URLSearchParams(additionalParams).toString(); //iskiosk = false

	const { data } = await axios.get(
		`${_key}?queryStr=${encodeURIComponent(JSON.stringify(productData))}&${queryString}`
	);

	return { data };
};

const useInfiniteProductsQuery = (options: any, state: string, rootKey?: string) => {
	const { isKiosk } = useKiosk();
	// const user = getUserDetails();
	// if (isKiosk) {
	// 	options['storeId'] = user?.seller_id;
	// }
	const additionalParams = {
		isKiosk: rootKey === 'storeId' || isKiosk
	};
	return useInfiniteQuery<any, Error>(
		[
			`${rootKey === 'storeId' ? '' : Config.BASE_PATH_INVENTORY}${ApiEndpoints.GET_PRODUCTS}`,
			options,
			state,
			additionalParams
		],
		fetchInfiniteProducts,
		{
			getNextPageParam: (data) => {
				const { currentPage = 1, totalProducts } = data?.data;
				const lastPage = Math.ceil(totalProducts / PER_PAGE);
				return currentPage === lastPage ? undefined : currentPage + 1;
			}
		}
	);
};

export { useInfiniteProductsQuery, fetchInfiniteProducts };
