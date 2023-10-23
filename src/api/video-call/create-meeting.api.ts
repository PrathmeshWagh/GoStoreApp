import axios from 'axios';
import { useMutation } from 'react-query';
import Config from 'react-native-config';
import { useDispatch } from 'react-redux';

import { ApiEndpoints } from '@api/utils/api-endpoints.api';
import { useEnhancedNavigation } from '@hooks/index';
import { AppDispatch } from '@slices/store';
import { showSnackbar } from '@slices/snackbar.slice';

async function createMeeting(data: any) {
    const response = await axios.post(`${Config.FIREBASE2_URL}${ApiEndpoints.CreateMeeting}`,data);
    return response;
}

export const useVideoCallMutation = () => {
    const { pop } = useEnhancedNavigation();
    const dispatch = useDispatch<AppDispatch>();

    return useMutation((payload: any) => createMeeting(payload), {
        onError: (error: any) => {
            if (error.response?.data?.message === 'No Seller found!') {
                pop();
                dispatch(showSnackbar({ message: 'No Seller found!', label: 'close' }));
            } else {
                pop();
                dispatch(showSnackbar({ message: 'No Seller found!', label: 'close' }));
            }
        },
    });
};
