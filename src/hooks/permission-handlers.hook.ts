import { PERMISSIONS, request, requestNotifications } from 'react-native-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

import { RouteConstants } from '@routes/constants.routes';
import useEnhancedNavigation from './navigation.hook';
import { AppTypes } from 'primitives/index';

const usePermissionHandlers = (currentItemIndex: number, itemWidth: number, sliderRef: any, sliderData: SliderItem[]) => {
    const { replace } = useEnhancedNavigation();

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
        if (Platform.OS === 'ios') {
            request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(() => {
                nextSlider();
            });
        } else {
            request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(() => {
                nextSlider();
            });
        }
    };

    const notificationPermissionHandler = () => {
        requestNotifications(['alert', 'sound']).then(() => {
            updateUserOnLastSlider();
            replace(RouteConstants.TabsScreenRoute);
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
