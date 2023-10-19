import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { openSettings } from 'react-native-permissions';

import { ButtonWrapper, FastImages } from '@atoms/index';
import { DefaultStyles } from '@primitives/index';
import { useDimensions, useEnhancedNavigation, useStore } from '@hooks/index';
import { AppDispatch, RootState } from '@slices/store';
import { RouteConstants } from 'routes/constants.routes';
import { showSnackbar } from '@slices/snackbar.slice';
import { updateLoginRedirect } from '@slices/ui.slice';

export const DEFAULT_VIDEO_CALL_STORE = {
    sellerId: 84675, //  30    //  This has to arzooo_seller_id
    sellerName: 'GoStor', //  "APR Electronics"
};

const Store = () => {
    const { width } = useDimensions();
    const { checkSellerAvailibilty, checkAndRequestPermissionsIOS, checkAndRequestPermissionsAndroid } = useStore();
    const dispatch = useDispatch<AppDispatch>();
    const auth = useSelector((state: RootState) => state.auth);
    const { navigate } = useEnhancedNavigation();
    const sellerAvailability = checkSellerAvailibilty();

    const handleVideoCall = async () => {
        if (sellerAvailability) {
            if (auth.loggedIn) {
                let permissionsGranted = false;
                if (Platform.OS === 'android') {
                    permissionsGranted = await checkAndRequestPermissionsAndroid();
                } else if (Platform.OS === 'ios') {
                    permissionsGranted = await checkAndRequestPermissionsIOS();
                }
                if (permissionsGranted) {
                    navigate(RouteConstants.VideoCallScreenRoute, { sellerId: 84675, sellerName: 'GoStor' });
                } else {
                    dispatch(showSnackbar({ message: 'Permission Not Granted', label: 'Open Settings', onPress: () => openSettings() }));
                }
            } else {
                dispatch(updateLoginRedirect({ loginRedirect: RouteConstants.StoreScreenRoute }));
                navigate(RouteConstants.LoginRoute);
            }
        } else {
            dispatch(showSnackbar({ message: 'Seller is not avaliable', label: 'Close' }));
        }
    };

    return (
        <View>
            <ButtonWrapper
                onPress={handleVideoCall}
                styles={{ height: width * 0.5, width }}
            >
                <FastImages
                    url="https://gostor.com/images/stores/banners/strip/store-banner-mobile.png"
                    style={styles.image}
                />
            </ButtonWrapper>
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
		borderRadius: DefaultStyles.DefaultRadius + 2,
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
});

export default Store;
