import { PERMISSIONS, request, requestNotifications } from 'react-native-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { RouteConstants } from '@routes/constants.routes';
import useNavigation from './navigation.hook';
import { AppTypes } from 'primitives/index';

const usePermissionHandlers = (currentItemIndex: number, itemWidth: number, sliderRef: any, sliderData: SliderItem[]) => {
    const { replace } = useNavigation();

    const updateUserOnLastSlider = async () => {
        try {
            await AsyncStorage.setItem(AppTypes.UserHasSeenPermissions, 'true');
        } catch (e) {
        }
    };

    const nextSlider = () => {
        if (sliderRef.current && currentItemIndex < sliderData.length - 1) {
            sliderRef.current.scrollToOffset({
                animated: true,
                offset: (currentItemIndex + 1) * itemWidth,
            });
            currentItemIndex += 1;
        }
    };

    const locationPermissionHandler = () => {
        request(PERMISSIONS.IOS.LOCATION_ALWAYS).then(() => {
            nextSlider();
        });
    };

    const notificationPermissionHandler = () => {
        requestNotifications(['alert', 'sound']).then(() => {
            updateUserOnLastSlider();
            replace(RouteConstants.HomeScreenRoute);
        });
    };

    const permissionHandler = (id: number) => {
        switch (id) {
            case 1:
                locationPermissionHandler();
                break;
            case 2:
                notificationPermissionHandler();
                break;
            default:
                break;
        }
    };

    return {
        permissionHandler,
    };

};

export default usePermissionHandlers;
