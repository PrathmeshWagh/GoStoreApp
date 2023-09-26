import { ApiEndpoints } from 'api/utils/api-endpoints.api';
import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
// import { httpTokenGet } from '../utils/utils';
import Config from 'react-native-config';
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
			? `${Config.BASE_PATH}${ApiEndpoints.CATEGORIES_V1}`
			: `${Config.BASE_PATH}${ApiEndpoints.CATEGORIES}`,
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
//"https://apigateway.dev.gostor.com/inventory"
//https://apigateway.gostor.com/inventory

export const useGetCategoriesQuery = (data: CategoryQueryInputs) => {
	return useQuery<ApiResponses.GetCategoriesResponse, Error>(
		[`${Config.BASE_PATH_INVENTORY}${ApiEndpoints.CATEGORIES}`, data],
		async () => {
			const { data: response } = await fetchCategories(data);

			return response;
		}
	);
};

// export const fetchCategoriesCarousel = async () => {
//   let response = await httpTokenGet(
//     `${process.env.NEXT_PUBLIC_MAIN_INVENTORY}${API_ENDPOINTS.CATEGORIES_CAROUSEL}`,
//   );
//   return response;
// };

// export const useGetCategoriesCarousel = () => {
//   return useMutation(fetchCategoriesCarousel, {
//     onSuccess: (response) => {
//       return response;
//     },
//     onError: (error: { status: string; msg: string }) => {
//       console.error('Categories Carousel Error', error);
//     },
//   });
// };
