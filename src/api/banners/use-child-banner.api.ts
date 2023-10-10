import Config from 'react-native-config';
import { useQuery, QueryFunctionContext } from 'react-query';
import axios from 'axios';
import { useSelector } from 'react-redux';

import { ApiEndpoints } from '@api/utils/api-endpoints.api';
import { RootState } from '@slices/store';
import { objectToQueryString } from '@helpers/index';

interface BannerType {
	bannerType: string;
	bId: number;
	clusterId: number;
	state: string;
	tagType?: string;
}

export const childBanner = async ({
	queryKey
}: QueryFunctionContext<
	[string, { bannerType: string; bId: number; clusterId: number; state: string; tag?: string }]
>) => {
	const [_key, _params] = queryKey;
	const queryString = objectToQueryString(_params);

	const { data } = await axios.get<BannerApiResponse | ProductApiResponse>(
		`${Config.BASE_PATH}${_key}?${queryString}`
	);
	return data;
};

export function useChildBanner(type: string, id: number, tag?: string) {
	const location = useSelector((state: RootState) => state.location);
	const bannerType = {
		bannerType: type,
		bId: id,
		clusterId: location.cluster_id,
		state: location.state
	} as BannerType;
	if (type === 'WITHOUT_BANNER') {
		bannerType.tagType = tag;
	}

	return useQuery([ApiEndpoints.BANNERDETAILS, bannerType], childBanner);
}
