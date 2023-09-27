import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { RoutesList } from './list.routes';
import { BottomTabList } from './bottom-tabs.routes';
import { Platform } from 'react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: { paddingBottom: Platform.OS === 'android' ? 6 : 24, paddingTop: Platform.OS === 'android' ? 16 : 12, justifyContent: 'center', height: Platform.OS === 'ios' ? 84 : 58 },
            }}
        >
            {
                BottomTabList.map((route) => {
                    return (
                        <Tab.Screen
                            key={route.id}
                            name={route.name}
                            component={route.component}
                            options={route.options}
                        />
                    );
                })
            }
        </Tab.Navigator>
    );
};

export const Router = () => {
    return (
        <Stack.Navigator>
            {
                RoutesList.map((route) => {
                    return (
                        <Stack.Screen
                            key={route.id}
                            name={route.name}
                            component={route.component}
                            options={route.options}
                        />
                    );
                })
            }
            <Stack.Screen
                name="TABS_SCREEN"
                component={BottomTabs}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};
