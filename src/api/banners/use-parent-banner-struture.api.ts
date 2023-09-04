import Config from 'react-native-config';
import { useQuery, QueryFunctionContext } from 'react-query';
import axios from 'axios';
import { useSelector } from 'react-redux';

import { ApiEndpoints } from '@api/utils/api-endpoints.api';
import { RootState } from '@slices/store';

export const parentBanner = async ({ queryKey }: QueryFunctionContext<[string, number]>) => {
	const [_key, _params] = queryKey;

    const { data } = await axios.get<ParentBannerApiResponse>(
		`${Config.BASE_PATH}${_key}?clusterId=${_params}`,
	);
	return data;
};

export function useParentBanner() {
    const location = useSelector((state: RootState) => state.location);

	return useQuery(
		[ApiEndpoints.ParentBannerStruture, location.cluster_id],
		parentBanner,
	);
}
