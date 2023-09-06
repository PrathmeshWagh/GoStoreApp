import React from 'react';

import { RouteConstants } from './constants.routes';
import { GocareActiveIcon, GocareInActiveIcon, HomeIcon, OfferIcon, StoreActiveIcon, StoreInActiveIcon } from '@icons/index';
import { HomeScreen, MainWebviewScreen } from './export.routes';
import { withActiveTab } from '@hoc/index';

const BottomTabList = [
    {
        id: 1,
        name: RouteConstants.HomeScreenRoute,
        component: HomeScreen,
        options: {
            headerShown: false,
            tabBarLabel: 'Home',
            tabBarActiveTintColor: '#3a9545',
            tabBarInactiveTintColor: '#000000',
            tabBarIcon: ({ focused }: any) => <HomeIcon isActive={focused} size={24} />,
        },
    },
    {
        id: 2,
        name: RouteConstants.MainWebviewScreenRoute + 'store',
        component: withActiveTab(MainWebviewScreen, 'store'),
        options: {
            headerShown: false,
            tabBarLabel: 'Stores',
            tabBarActiveTintColor: '#3a9545',
            tabBarInactiveTintColor: '#000000',
            tabBarIcon: ({ focused }: { focused: boolean }) => (
                focused
                    ? <StoreActiveIcon size={24} /> 
                    : <StoreInActiveIcon size={24} />
            ),
        },
    },
    {
        id: 3,
        name: RouteConstants.MainWebviewScreenRoute + 'gocare',
        component: withActiveTab(MainWebviewScreen, 'go-care'),
        options: {
            headerShown: false,
            tabBarLabel: 'Gocare',
            tabBarActiveTintColor: '#3a9545',
            tabBarInactiveTintColor: '#000000',
            tabBarIcon: ({ focused }: { focused: boolean }) => (
                focused
                    ? <GocareActiveIcon size={24} />
                    : <GocareInActiveIcon size={24} />
            ),
        },
    },
    {
        id: 4,
        name: RouteConstants.MainWebviewScreenRoute + 'offers',
        component: withActiveTab(MainWebviewScreen, 'offers'),
        options: {
            headerShown: false,
            tabBarLabel: 'Offers',
            tabBarActiveTintColor: '#3a9545',
            tabBarInactiveTintColor: '#000000',
            tabBarIcon: ({ focused }: any) => <OfferIcon isActive={focused} size={24} />,
        },
    },
];

export {
    BottomTabList,
};
