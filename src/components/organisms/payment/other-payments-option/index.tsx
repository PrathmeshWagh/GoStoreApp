import { View, Text,StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import { DefaultStyles } from 'primitives';.
import Divider from 'components/atoms/divider.atom';

const OtherPayOption = () => {
	return (
		<View>
			<Text style={{ marginTop: 20, marginBottom: 10 }}>Other Payment Option</Text>
			<View style={styles.cardsbox}>
				<TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
					<View>
						<Text>EMI</Text>
						<Text>Select From A List Of Provider</Text>
					</View>
					<Text>X</Text>
				</TouchableOpacity>
				<Divider type="dashed" />

				<TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
					<View>
						<Text>Pay on delivery</Text>
						<Text>Pay in cash or pay in online</Text>
					</View>
					<Text>X</Text>
        </TouchableOpacity>
        <Divider type="dashed" />

        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
					<View>
						<Text>Net banking</Text>
						<Text>Select from a list of banks</Text>
					</View>
					<Text>X</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default OtherPayOption;
const styles = StyleSheet.create({
  cardsbox: {
		borderWidth: 1,
		borderRadius: 8,
		padding: DefaultStyles.DefaultPadding
	}
})
