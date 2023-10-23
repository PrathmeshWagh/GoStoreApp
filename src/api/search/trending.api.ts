import Config from 'react-native-config';
import { useQuery, QueryFunctionContext } from 'react-query';
import axios from 'axios';

import { ApiEndpoints } from '@api/utils/api-endpoints.api';

export const trending = async ({ queryKey }: QueryFunctionContext<[string]>) => {
	const [_key] = queryKey;
    const { data } = await axios.get<CustomTypes.TrendingSearchResponse>(
        `${Config.BASE_PATH_INVENTORY}/${_key}`,
    );
    return data;
};

export function useTrending() {
	return useQuery(
		[ApiEndpoints.SearchAnalytics],
		trending
	);
}