import Config from 'react-native-config';
import axios from 'axios';
import { ApiEndpoints } from 'api/utils/api-endpoints.api';

import { useQuery } from 'react-query';

type CategoryQueryInputs = {
	category?: string;
	storeId?: number;
	level: CustomTypes.CategoryLevels;
	clusterId?: number;
	productIds?: string;
	brands?: string;
};
export const fetchCategories = ({ productIds, brands, ...inputs }: CategoryQueryInputs) => {
	if (!inputs?.clusterId) return null;
	return axios.get<ApiResponses.GetCategoriesResponse>(
		inputs?.storeId
			? `${Config.BASE_PATH_INVENTORY}${ApiEndpoints.CATEGORIES_V1}`
			: `${Config.BASE_PATH_INVENTORY}${ApiEndpoints.CATEGORIES}`,
		{
			params: {
				...inputs,
				...(productIds ? { productIds: `${productIds}` } : {}),
				...(brands
					? {
							brands: brands
								.split(',')
								.map((eachBrand) => `"${eachBrand}"`)
								.join(',')
					  }
					: {})
			}
		}
	);
};

export const useGetCategoriesQuery = (data: CategoryQueryInputs) => {
	return useQuery<ApiResponses.GetCategoriesResponse, Error>(
		[`${Config.BASE_PATH_INVENTORY}${ApiEndpoints.CATEGORIES}`, data],
		async () => {
			const { data: response } = await fetchCategories(data);

			return response;
		}
	);
};
