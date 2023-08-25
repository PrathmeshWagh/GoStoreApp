import Config from 'react-native-config';
import { useQuery, QueryFunctionContext } from 'react-query';
import axios from 'axios';
import { useSelector } from 'react-redux';

import { ApiEndpoints } from '@primitives/api-endpoints.primitives';
import { RootState } from '@slices/store';
import { objectToQueryString } from '@helpers/utils.helpers';

export const childBanner = async ({ queryKey }: QueryFunctionContext<[string, { bannerType: string, bId: number, clusterId: number, state: string }]>) => {
	const [_key, _params] = queryKey;
    const queryString = objectToQueryString(_params);

    const { data } = await axios.get<BannerApiResponse>(
		`${Config.BASE_PATH}${_key}?${queryString}`,
	);
	return data;
};

export function useChildBanner(type: string, id: number) {
    const location = useSelector((state: RootState) => state.location);
    const bannerType = {
        bannerType: type,
        bId: id,
        clusterId: location.cluster_id,
        state: location.state,
    };

	return useQuery(
		[ApiEndpoints.BannerDetails, bannerType],
		childBanner,
	);
}

