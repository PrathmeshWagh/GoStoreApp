import Config from 'react-native-config';
import { useQuery, QueryFunctionContext } from 'react-query';
import axios from 'axios';

import { ApiEndpoints } from '@api/utils/api-endpoints.api';

export const categories = async ({ queryKey }: QueryFunctionContext<[string]>) => {
	const [_key] = queryKey;

	const { data } = await axios.get<CategoryApiResponse>(`${Config.BASE_PATH_INVENTORY}${_key}`);
	return data;
};

export function useCategories() {
	return useQuery([ApiEndpoints.CATEGORIES_CAROUSEL], categories);
}
