import Config from 'react-native-config';
import { useQuery, QueryFunctionContext } from 'react-query';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import { ApiEndpoints } from '@api/utils/api-endpoints.api';
import { AppDispatch } from '@slices/store';
import { updateLocation } from '@slices/location.slice';
import { useEnhancedNavigation } from '@hooks/index';
import { showSnackbar } from '@slices/snackbar.slice';

export const updatePincode = async ({ queryKey }: QueryFunctionContext<[string, string, () => void, AppDispatch, () => void]>) => {
	const [_key, pincode, reset, dispatch, pop] = queryKey;
    const { data } = await axios.get<LocationResponse>(
		`${Config.BASE_PATH_INVENTORY}${_key}/${pincode}`,
	);
    if (data.status === 'success') {
        reset();
        dispatch(updateLocation({ city: data?.data?.city, cluster_id: data?.data?.cluster_id, state: data?.data?.state, pincode: data?.data?.pincode }));
        dispatch(showSnackbar({ message: `Location updated to ${data?.data?.city}`, label: 'Close' }));
        pop();
    } else if (data.status === 'error') {
        dispatch(showSnackbar({ message: data?.msg, label: 'Close' }));
    } else {
        dispatch(showSnackbar({ message: 'Error while updating location.', label: 'Close' }));
    }
};

export function usePincode(pincode: string, reset: () => void) {
    const dispatch = useDispatch<AppDispatch>();
    const { pop } = useEnhancedNavigation();

	return useQuery(
		[ApiEndpoints.Pincode, pincode, reset, dispatch, pop],
		updatePincode,
        {
            enabled: false,
        }
	);
}
