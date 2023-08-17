import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RoutesList from './list.routes';

const Stack = createNativeStackNavigator();

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
        </Stack.Navigator>
    );
};
