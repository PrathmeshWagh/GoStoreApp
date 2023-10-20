import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { DefaultStyles } from 'primitives';
import Divider from 'components/atoms/divider.atom';

const Cards = () => {
	return (
		<View>
			<Text style={{ marginTop: 20, marginBottom: 10 }}>Cards</Text>
			<View style={styles.cardsbox}>
				<TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
					<View>
						<Text>Credit Card</Text>
						<Text>Pay Using Credit Card</Text>
					</View>
					<Text>X</Text>
				</TouchableOpacity>
				<Divider type="dashed" />

				<TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
					<View>
						<Text>Debit Card</Text>
						<Text>Pay Using Debit Card</Text>
					</View>
					<Text>X</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default Cards;
const styles = StyleSheet.create({
	cardsbox: {
		borderWidth: 1,
		borderRadius: 8,
		padding: DefaultStyles.DefaultPadding
	}
});
