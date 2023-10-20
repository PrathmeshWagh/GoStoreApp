import { View, Text, Modal, StyleSheet } from 'react-native';
import React from 'react';
import useOffersSectionHook from './useOffersSection.hook';
import ApplyOffer from './apply-offer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CustomColors } from 'constants/colors.constants';
import OfferList from './offer-list';

const OfferSection = () => {
	const { showOffersModal, openOffersModal, hideOffersModal, handleOfferSelection } =
		useOffersSectionHook();
	return (
		<View>
			<ApplyOffer openOffersModal={openOffersModal} />
			<Modal
				animationType="fade"
				transparent={true}
				visible={showOffersModal}
				onRequestClose={hideOffersModal}
			>
				<View style={styles.modalContainer}>
					<View style={styles.offerTextBox}>
						<Text style={{ color: CustomColors.cart, fontSize: 15 }}>Offers </Text>
						<Icon name={'close'} size={25} onPress={hideOffersModal} />
					</View>
					<OfferList handleOfferSelection={handleOfferSelection} />
				</View>
			</Modal>
		</View>
	);
};

export default OfferSection;
const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)'
	},
	offerTextBox: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 5,
		borderBottomWidth: 1,
		borderBottomColor: CustomColors.cart
	}
});
