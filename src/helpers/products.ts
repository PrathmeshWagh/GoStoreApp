// import { PER_PAGE } from './constants';
export const PER_PAGE = 24;

interface Props {
	query?: any;
	location: any;
	type: 'productListing' | 'filterListing';
	page: number;
}

export const getProductParams = ({
	query,
	location,
	type,
	page = -1
}: Props): CustomTypes.ProductQueryParams => {
	const payload = {};

	// For Category Page.
	if (query?.category) payload['category'] = query?.category;
	if (query?.categoryId) payload['categoryId'] = query?.categoryId;

	// For Store Page.
	if (query?.storeId) {
		payload['storeId'] = query?.storeId;
		payload['getStoreProducts'] = true;
		if (type === 'filterListing') {
			payload['getCount'] = 'true';
		}
	}

	// For Search Page.
	if (query?.searchQuery) payload['searchQuery'] = query?.searchQuery;

	// For Banners Tagging or listing page.
	if (query?.productIds) payload['productIds'] = (query?.productIds as any).split(',');

	// General Filters for all pages.
	if (query?.brand) payload['brandArr'] = (query?.brand as any)?.split(',');
	if (query?.deliveryOptions)
		payload['deliveryOptionsArr'] = (query?.deliveryOptions as any)?.split(',');

	payload['priceFilter'] = {
		minPrice: query?.minPrice,
		maxPrice: query?.maxPrice
	};
	payload['filterObj'] = {
		...(query?.options ? JSON.parse(query?.options as any) : {}),
		...(query?.latestFilterObj
			? {
					latestFilterObj: JSON.parse(decodeURIComponent(query?.latestFilterObj as any))
			  }
			: {})
	};

	// Location Data.
	if (location?.cluster_id) payload['clusterId'] = location?.cluster_id;
	if (location?.state) payload['state'] = location?.state;

	// Sorting.
	if (query?.sort_by) payload['sort'] = query?.sort_by;

	// Pagination
	payload['pageSize'] = PER_PAGE;
	payload['page'] = page;

	return payload;
	// return {
	//   category: query?.category,
	//   categoryId: query?.categoryId,
	//   clusterId: location?.cluster_id,
	//   state: location?.state,
	//   pageSize: PER_PAGE,
	//   brandArr: (query?.brand as any)?.split(','),
	//   // deliveryOptionsArr: (query?.deliveryOptions as any)?.split(','),
	//   priceFilter: {
	//     minPrice: query?.minPrice,
	//     maxPrice: query?.maxPrice,
	//   },
	//   filterObj: {
	//     ...(query?.options ? JSON.parse(query?.options as any) : {}),
	//     ...(query?.latestFilterObj
	//       ? {
	//           latestFilterObj: JSON.parse(decodeURIComponent(query?.latestFilterObj as any)),
	//         }
	//       : {}),
	//   },
	//   sort: query?.sort_by,
	//   page: page,
	//   // getCount: 'true',
	//   ...(query?.storeId ? { storeId: query?.storeId, getStoreProducts: true } : {}),
	//   ...(query?.productIds ? { productIds: (query?.productIds as any).split(',') } : {}),
	//   ...(query?.searchQuery ? { searchQuery: query?.searchQuery } : {}),
	// };
};
