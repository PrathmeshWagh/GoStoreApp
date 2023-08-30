import React from 'react';

import { HomeScreen, PermissionsScreen, SplashScreen } from './export.routes';
import { RouteConstants } from './constants.routes';
import { HomeIcon } from '@icons/index';

const BottomTabList = [
    { id: 1, name: RouteConstants.HomeScreenRoute, component: HomeScreen,
            options: { headerShown: false, tabBarLabel: 'Home', tabBarIcon: ({ focused }: any) => <HomeIcon color={focused ? '#3a9545' : '#000'} size={24} />},
    },
    { id: 2, name: RouteConstants.SplashScreenRoute, component: SplashScreen,
        options: { headerShown: false, tabBarLabel: 'Gocare', tabBarIcon: ({ focused }: any) => <HomeIcon color={focused ? '#3a9545' : '#000'} size={32} />},
    },
];

const RoutesList = [
    { id: 1, name: RouteConstants.SplashScreenRoute, component: SplashScreen, options: { headerShown: false } },
    { id: 3, name: RouteConstants.PermissionsScreenRoute, component: PermissionsScreen, options: { headerShown: false } },
];

export {
    RoutesList,
    BottomTabList,
};
