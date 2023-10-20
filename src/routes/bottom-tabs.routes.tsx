/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text } from 'react-native-paper';

import { RouteConstants } from './constants.routes';
import {
	GocareActiveIcon,
	GocareInActiveIcon,
	HomeIcon,
	OfferIcon,
	StoreActiveIcon,
	StoreInActiveIcon
} from '@icons/index';
import { HomeScreen, MainWebviewScreen, StoreScreen, UserAccountScreen } from './export.routes';
import { withActiveTab } from '@hoc/index';
import { Platform } from 'react-native';

const BottomTabList = [
	{
		id: 1,
		name: RouteConstants.HomeScreenRoute,
		component: HomeScreen,
		options: {
			headerShown: false,
			tabBarLabel: ({ focused }: any) => (
				<Text
					style={[
						{ marginTop: Platform.OS === 'ios' ? 4 : 12 },
						focused ? { color: '#3a9545' } : { color: '#000' }
					]}
					variant="titleSmall"
				>
					Home
				</Text>
			),
			tabBarActiveTintColor: '#3a9545',
			tabBarInactiveTintColor: '#000000',
			tabBarIcon: ({ focused }: any) => <HomeIcon isActive={focused} size={24} />
		}
	},
	{
		id: 2,
		name: RouteConstants.StoreScreenRoute,
		component: StoreScreen,
		options: {
			headerShown: false,
			tabBarLabel: ({ focused }: any) => (
				<Text
					style={[
						{ marginTop: Platform.OS === 'ios' ? 4 : 12 },
						focused ? { color: '#3a9545' } : { color: '#000' }
					]}
					variant="titleSmall"
				>
					Stores
				</Text>
			),
			tabBarActiveTintColor: '#3a9545',
			tabBarInactiveTintColor: '#000000',
			tabBarIcon: ({ focused }: { focused: boolean }) =>
				focused ? <StoreActiveIcon size={24} /> : <StoreInActiveIcon size={24} />
		},
	},
	{
		id: 3,
		name: RouteConstants.MainWebviewScreenRoute + 'gocare',
		component: withActiveTab(MainWebviewScreen, 'go-care'),
		options: {
			headerShown: false,
			tabBarLabel: ({ focused }: any) => (
				<Text
					style={[
						{ marginTop: Platform.OS === 'ios' ? 4 : 12 },
						focused ? { color: '#3a9545' } : { color: '#000' }
					]}
					variant="titleSmall"
				>
					Gocare
				</Text>
			),
			tabBarActiveTintColor: '#3a9545',
			tabBarInactiveTintColor: '#000000',
			tabBarIcon: ({ focused }: { focused: boolean }) =>
				focused ? <GocareActiveIcon size={24} /> : <GocareInActiveIcon size={24} />
		}
	},
	{
		id: 4,
		name: RouteConstants.MainWebviewScreenRoute + 'offers',
		component: withActiveTab(MainWebviewScreen, 'offers'),
		options: {
			headerShown: false,
			tabBarLabel: ({ focused }: any) => (
				<Text
					style={[
						{ marginTop: Platform.OS === 'ios' ? 4 : 12 },
						focused ? { color: '#3a9545' } : { color: '#000' }
					]}
					variant="titleSmall"
				>
					Offers
				</Text>
			),
			tabBarActiveTintColor: '#3a9545',
			tabBarInactiveTintColor: '#000000',
			tabBarIcon: ({ focused }: any) => <OfferIcon isActive={focused} size={24} />
		}
	},
	{
		id: 4,
		name: RouteConstants.UserAccountScreenRoute,
		component: UserAccountScreen,
		options: {
			headerShown: false,
			tabBarLabel: ({ focused }: any) => (
				<Text
					style={[
						{ marginTop: Platform.OS === 'ios' ? 4 : 12 },
						focused ? { color: '#3a9545' } : { color: '#000' }
					]}
					variant="titleSmall"
				>
					Account
				</Text>
			),
			tabBarActiveTintColor: '#3a9545',
			tabBarInactiveTintColor: '#000000',
			tabBarIcon: ({ focused }: any) => <OfferIcon isActive={focused} size={24} />
		}
	}
];

export { BottomTabList };
