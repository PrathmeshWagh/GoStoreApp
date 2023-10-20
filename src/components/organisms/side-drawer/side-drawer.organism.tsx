import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { useEnhancedNavigation } from '@hooks/index';
import { RouteConstants } from '@routes/constants.routes';

const SideDrawer = () => {
	const { navigate } = useEnhancedNavigation();
	return (
		<View>
			<TouchableOpacity onPress={() => navigate(RouteConstants.LoginRoute)}>
				<Text>
					Login
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default SideDrawer;

