import { useGetCategoriesQuery } from 'api/categories/get-categories';
// import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '@slices/store';

/**
 * Hook that uses query string to get list of categories.
 * Note that this hook is tightly bound to query string.
 * In case different logic is needed, ideally build separate hook.
 */
const useGetCategoriesFromQueryString = ({ brand }) => {
	// const { query } = useRouter();

	const location = useSelector((state: RootState) => state.location);

	return useGetCategoriesQuery({
		level: 'L1',
		clusterId: location?.cluster_id,

		// ...(query.productIds
		// 	? {
		// 			productIds: Array.isArray(query.productIds) ? query.productIds[0] : query.productIds
		// 	  }
		// 	: {}),
		...(brand
			? {
					brands: Array.isArray(brand) ? brand[0] : brand
			  }
			: {})
		// ...(query.storeId ? { storeId: +query.storeId } : {}),
		// ...(query.searchQuery ? { searchQuery: query.searchQuery } : {})
	});
};

// const useGetActiveCategoryFromQueryString = () => {
// 	const { query } = useRouter();
// 	return query.category as string;
// };

const CategoryHooks = {
	useGetCategoriesFromQueryString
	// useGetActiveCategoryFromQueryString
};

export default CategoryHooks;
