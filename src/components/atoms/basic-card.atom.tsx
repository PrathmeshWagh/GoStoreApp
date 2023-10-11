import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native';

interface BasicCardProps {
	children?: React.ReactNode;
	style?: any;
	onPress?: () => void;
}

const BasicCard: React.FC<BasicCardProps> = ({ children, style, onPress }) => {
	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View style={[styles.card, style]}>
				<ScrollView contentContainerStyle={styles.cardContent} showsVerticalScrollIndicator={false}>
					{children}
				</ScrollView>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	card: {
		borderWidth: 0.6,
		borderColor: 'grey',
		paddingHorizontal: 12,
		borderRadius: 10,
		backgroundColor: 'white'
	},
	cardContent: {
		paddingVertical: 8,
		paddingHorizontal: 5,
		overflow: 'scroll'
	}
});

export default BasicCard;
