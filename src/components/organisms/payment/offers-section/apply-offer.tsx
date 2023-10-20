import { CustomColors } from 'constants/colors.constants';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ApplyOffer = ({ openOffersModal }: any) => {
	return (
		<TouchableOpacity style={styles.container} onPress={openOffersModal}>
			<View style={{ flexDirection: 'row' }}>
				<Text>?</Text>
				<Text style={styles.applytext}>Apply Bank Offer</Text>
			</View>
			<Icon name="greater-than" size={20} />
		</TouchableOpacity>
	);
};

export default ApplyOffer;
const styles = StyleSheet.create({
	container: {
		borderWidth: 1,
		borderRadius: 10,
		height: 40,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	applytext: {
		color: CustomColors.cart
	}
});
