import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { RoutesList, BottomTabList } from './list.routes';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabs = () => {
    return (
        <Tab.Navigator>
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
