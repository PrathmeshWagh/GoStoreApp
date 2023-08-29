import Config from 'react-native-config';
import { useQuery, QueryFunctionContext } from 'react-query';
import axios from 'axios';
import { useSelector } from 'react-redux';

import { ApiEndpoints } from '@primitives/api-endpoints.primitives';
import { RootState } from '@slices/store';

export const products = async ({ queryKey }: QueryFunctionContext<[string, { clusterId: number, productIds: string[], state: string }, boolean]>) => {
	const [_key, type, isKiosk] = queryKey;
    const { data } = await axios.get<ProductResponseData>(
		`${Config.BASE_PATH_INVENTORY}${_key}?queryStr=${encodeURIComponent(JSON.stringify(type))}&isKiosk=${isKiosk}`,
	);
	return data;
};

export function useProducts(productIds: string) {
    const location = useSelector((state: RootState) => state.location);
    const clusterId = location.cluster_id;
    const state = location.state;

    const type = {
        productIds: productIds?.split(','),
        clusterId,
        state,
    };
    let isKiosk = false;

	return useQuery(
		[ApiEndpoints.Products, type, isKiosk],
		products,
        {
            enabled: productIds ? true : false,
        }
	);
}

