import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { DefaultStyles, FontGilroy } from '@primitives/index';

const Highlight = () => {
	const [expanded, setExpanded] = useState(false);

	const toggleDetails = () => {
		setExpanded(!expanded);
	};

	return (
		<View>
			<TouchableOpacity onPress={toggleDetails}>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
					<Text style={{ fontSize: 18, fontFamily: FontGilroy.Bold }}>Highlights</Text>
					<Icon name={expanded ? 'chevron-up' : 'chevron-down'} size={25} color="#000" />
				</View>
			</TouchableOpacity>

			{expanded && (
				<View>
					<Text>Supported Apps: Netflix, Disney+Hotstar</Text>
					<Text>Operating System: WebOS</Text>
					<Text>Sound Output: 20 W</Text>
					<Text>Prime Video, Youtube</Text>
					<Text>Resolution: Ultra HD (4K) 3840 x 2160 Pixels</Text>
					<Text>Refresh Rate: 60 Hz</Text>
				</View>
			)}
		</View>
	);
};

export default Highlight;
