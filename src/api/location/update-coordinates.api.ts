import Config from 'react-native-config';
import { useQuery, QueryFunctionContext } from 'react-query';
import axios from 'axios';
import Toast from 'react-native-toast-message';

import { ApiEndpoints } from '@api/utils/api-endpoints.api';

export const coordinates = async ({ queryKey }: QueryFunctionContext<[string, number, number]>) => {
	const [_key, latitude, longitude] = queryKey;
    const { data } = await axios.get<LocationResponse>(
		`${Config.BASE_PATH_INVENTORY}${_key}/${latitude}/${longitude}`,
	);
    if (data.status === 'success') {
        Toast.show({
            type: 'gostor_type',
            props: { msg: 'Location updated successfully!' },
            position: 'bottom',
        });
    } else {
        Toast.show({
            type: 'gostor_type',
            props: { msg: 'Error while updating location.' },
            position: 'bottom',
        });
    }
};

export function useCoordinates(latitude: number, longitude: number) {
	return useQuery(
		[ApiEndpoints.Coordinates, latitude, longitude],
		coordinates,
        {
            enabled: false,
        }
	);
}
