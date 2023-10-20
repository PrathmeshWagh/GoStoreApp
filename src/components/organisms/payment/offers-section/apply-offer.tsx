import { CustomColors } from 'constants/colors.constants';
import { DefaultStyles, FontGilroy } from 'primitives';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ApplyOffer = ({ openOffersModal }: any) => {
	return (
		<TouchableOpacity style={styles.container} onPress={openOffersModal}>
			<View style={{ flexDirection: 'row' }}>
				<Text style={{ paddingRight: DefaultStyles.DefaultPadding - 5 }}>?</Text>
				<Text style={styles.applytext}>Apply Bank Offer</Text>
			</View>
			<Icon name="greater-than" size={20} />
		</TouchableOpacity>
	);
};

export default ApplyOffer;
const styles = StyleSheet.create({
	container: {
		marginTop: 20,
		borderWidth: 0.5,
		borderRadius: 15,
		height: 35,
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderColor: CustomColors.cart,
		alignItems: 'center',
		paddingHorizontal: DefaultStyles.DefaultPadding - 5
	},
	applytext: {
		color: CustomColors.cart,
		fontFamily: FontGilroy.Medium
	}
});
