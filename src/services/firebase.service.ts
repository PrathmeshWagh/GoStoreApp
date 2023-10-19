import { Platform } from 'react-native';

// Your secondary Firebase project credentials for Android...
const androidCredentials = {
    apiKey: 'AIzaSyD0exZxE293Wd_Ae_ZWP_F8C6t94NKpGn8' as string,
    authDomain: 'arzooo-dev.firebaseapp.com' as string,
    databaseURL: 'https://arzooo-dev-default-rtdb.firebaseio.com' as string,
    projectId: 'arzooo-dev' as string,
    storageBucket: 'arzooo-dev.appspot.com' as string,
    messagingSenderId: '236048597235' as string,
    appId: '1:236048597235:android:c7e89a852daef717573786' as string,
    measurementId: '236048597235' as string,
    clientId: '236048597235-r8atq5mc36suj5gi47n0a36lb3voiujr.apps.googleusercontent.com' as string,
};

// Your secondary Firebase project credentials for iOS...
const iosCredentials = {
    apiKey: 'AIzaSyD0exZxE293Wd_Ae_ZWP_F8C6t94NKpGn8' as string,
    authDomain: 'arzooo-dev.firebaseapp.com' as string,
    databaseURL: 'https://arzooo-dev-default-rtdb.firebaseio.com' as string,
    projectId: 'arzooo-dev' as string,
    storageBucket: 'arzooo-dev.appspot.com' as string,
    messagingSenderId: '236048597235' as string,
    appId: '747357881574:ios:16ddd42d3feb577d44a727' as string,
    measurementId: '236048597235' as string,
    clientId: '236048597235-r8atq5mc36suj5gi47n0a36lb3voiujr.apps.googleusercontent.com' as string,
};

const credentials = Platform.select({
  android: androidCredentials,
  ios: iosCredentials,
}) as any;

const config = {
    name: 'videocallfb',
};

export {
    credentials,
    config,
};
