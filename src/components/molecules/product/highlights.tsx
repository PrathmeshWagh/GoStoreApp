import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { DefaultStyles, FontGilroy } from '@primitives/index';
import { useTheme } from '@hooks/index';

const Highlight = () => {
	const { colors } = useTheme();
	const [expanded, setExpanded] = useState(false);

	const toggleDetails = () => {
		setExpanded(!expanded);
	};

	return (
		<View style={styles.hightlight}>
			<TouchableOpacity onPress={toggleDetails}>
				<View style={styles.direction}>
					<Text style={styles.highlightText}>Highlights</Text>
					<Icon
						name={expanded ? 'chevron-up' : 'chevron-down'}
						size={25}
						color={colors.secondary}
					/>
				</View>
			</TouchableOpacity>

			{expanded && (
				<View>
					<View style={styles.info}>
						<Text style={styles.bulletText}>{'\u2022'}</Text>
						<Text>Supported Apps: Netflix, Disney+Hotstar</Text>
					</View>
					<View style={styles.info}>
						<Text style={styles.bulletText}>{'\u2022'}</Text>
						<Text>Operating System: WebOS</Text>
					</View>
				</View>
			)}
		</View>
	);
};

export default Highlight;

const styles = StyleSheet.create({
	hightlight: {
		borderBottomWidth: 1,
		paddingBottom: 10,
		marginVertical: 15
	},
	highlightText: {
		fontSize: 18,
		fontFamily: FontGilroy.Bold
	},
	direction: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	bulletText: {
		fontSize: 18,
		marginRight: 10
	},
	info: {
		flexDirection: 'row',
		alignItems: 'center'
	}
});
