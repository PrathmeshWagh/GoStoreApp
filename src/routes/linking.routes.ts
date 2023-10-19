import { Linking } from 'react-native';
import ReactMoE from 'react-native-moengage';
import dynamicLinks, { FirebaseDynamicLinksTypes } from '@react-native-firebase/dynamic-links';

import { RouteConstants } from './constants.routes';

// Configuration for the screens and their associated deep link paths
const config = {
    screens: {
        [RouteConstants.TabsScreenRoute]: {
            screens: {
                [RouteConstants.HomeScreenRoute]: 'home',
                [RouteConstants.StoreScreenRoute]: 'stores',
            },
        },
        [RouteConstants.LocationScreenRoute]: 'location',
        [RouteConstants.SideDrawerScreenRoute]: 'drawer',
    },
};

// Asynchronous function to get the initial URL if the app was opened from a deep link
const getInitialURL = async (): Promise<string | undefined> => {
    // Try to get a URL from the standard Linking module
    const url = await Linking.getInitialURL();

    // If no URL from Linking, try to get a URL from Firebase's dynamicLinks
    const dynamicLinkUrl = await dynamicLinks().getInitialLink();

    // Return the URL if found from either method
    if (dynamicLinkUrl?.url || url) {
        return dynamicLinkUrl?.url ?? url ?? undefined;
    }

    // If no URL is found, set an event listener for MoEngage notifications
    ReactMoE.setEventListener('pushClicked', (notificationPayload: any) => {
        // If the notification comes from 'moengage', return the associated URL
        if (notificationPayload.push_from === 'moengage') {
            return notificationPayload.gcm_webUrl;
        }
    });
};

// Function to subscribe to incoming deep links
const subscribe = (listener: (url: string) => void) => {
    // Set up an event listener for the standard Linking module
    const onReceiveURL = ({ url }: { url: string }) => listener(url);
    Linking.addEventListener('url', onReceiveURL);

    // Set up a listener for Firebase's dynamicLinks
    const handleDynamicLink = (dynamicLink: FirebaseDynamicLinksTypes.DynamicLink) => {
        listener(dynamicLink.url);
    };

    // Subscribe to Firebase dynamic links
    const unsubscribeToDynamicLinks = dynamicLinks().onLink(handleDynamicLink);

    // Return a cleanup function to unsubscribe from Firebase dynamic links
    return () => {
        unsubscribeToDynamicLinks();
    };
};

// Consolidated linking configuration
const linking = {
    // URL prefixes that the app should respond to
    prefixes: ['https://gostor.com', 'https://test.gostor.com', 'gostor://', 'https://gostordevelop.page.link'],

    // Functions for handling deep links
    getInitialURL,
    subscribe,

    // Route configuration
    config,
};

const navigationContainerProps = {
    linking,
};

export { linking, navigationContainerProps };
