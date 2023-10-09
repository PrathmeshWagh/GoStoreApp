import Config from 'react-native-config';
import { useQuery, QueryFunctionContext } from 'react-query';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import { ApiEndpoints } from '@api/utils/api-endpoints.api';
import { AppDispatch } from '@slices/store';
import { updateLocation } from '@slices/location.slice';
import { useEnhancedNavigation } from '@hooks/index';
import { showSnackbar } from '@slices/snackbar.slice';

export const coordinates = async ({ queryKey }: QueryFunctionContext<[string, number, number, AppDispatch, () => void]>) => {
	const [_key, latitude, longitude, dispatch, pop] = queryKey;
    const { data } = await axios.get<LocationResponse>(
		`${Config.BASE_PATH_INVENTORY}${_key}/${latitude}/${longitude}`,
	);
    if (data.status === 'success') {
        dispatch(updateLocation({ city: data?.data?.city, cluster_id: data?.data?.cluster_id, state: data?.data?.state, pincode: data?.data?.pincode }));
        dispatch(showSnackbar({ message: `Location updated to ${data?.data?.city}`, label: 'Close' }));
        pop();
    } else if (data.status === 'error') {
        dispatch(showSnackbar({ message: data?.msg, label: 'Close' }));
    } else {
        dispatch(showSnackbar({ message: 'Error while updating location.', label: 'Close' }));
    }
};

export function useCoordinates(latitude: number, longitude: number) {
    const dispatch = useDispatch<AppDispatch>();
    const { pop } = useEnhancedNavigation();

	return useQuery(
		[ApiEndpoints.Coordinates, latitude, longitude, dispatch, pop],
		coordinates,
        {
            enabled: false,
        }
	);
}
