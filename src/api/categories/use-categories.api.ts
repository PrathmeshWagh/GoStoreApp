import Config from 'react-native-config';
import { useQuery, QueryFunctionContext } from 'react-query';
import axios from 'axios';

import { ApiEndpoints } from '@primitives/api-endpoints.primitives';

export const categories = async ({ queryKey }: QueryFunctionContext<[string]>) => {
	const [_key] = queryKey;
    const { data } = await axios.get<CategoryApiResponse>(
		`${Config.BASE_PATH}${_key}`,
	);
	return data;
};

export function useCategories() {

	return useQuery(
		[ApiEndpoints.Categories],
		categories,
	);
}
