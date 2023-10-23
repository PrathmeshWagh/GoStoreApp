import Config from 'react-native-config';
import { useQuery, QueryFunctionContext } from 'react-query';
import axios from 'axios';

import { ApiEndpoints } from '@api/utils/api-endpoints.api';
import { useSearchContext } from 'context/search.context';

export const search = async ({ queryKey }: QueryFunctionContext<[string, string]>) => {
	const [_key, value] = queryKey;
    const { data } = await axios.get<CustomTypes.SearchData[]>(
        `${Config.BASE_PATH_INVENTORY}/${_key}${value}`,
    );
    return data;
};

export function useSearch() {
    const { searchValue } = useSearchContext();

	return useQuery(
		[ApiEndpoints.Discovery, searchValue],
		search,
        {
            enabled: false,
        }
	);
}
