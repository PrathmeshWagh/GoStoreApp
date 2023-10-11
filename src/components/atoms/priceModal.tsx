import { DefaultStyles } from 'primitives';
import { View, Modal, StyleSheet, Text, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CustomColors } from 'constants/colors.constants';

interface PriceModalProps {
	setModalVisible?: boolean;
	priceData: { id: number; label: string }[];
}

const PriceModal = (props: PriceModalProps) => {
	const { setModalVisible, priceData } = props;

	const closeModal = () => {
		setModalVisible(false);
	};

	return (
		<>
			<View style={styles.modalView}>
				{priceData?.map((price, index) => (
					<Pressable
						key={index}
						style={[styles.textandicon, index < priceData.length - 1 && styles.borderBottom]}
						onPress={closeModal}
					>
						<Text key={index}>{price.label}</Text>
						<Icon name="circle-slice-8" size={20} color={CustomColors.primary} />
					</Pressable>
				))}
			</View>
		</>
	);
};

export default PriceModal;
const styles = StyleSheet.create({
	modalView: {
		width: '95%',
		height: DefaultStyles.DefaultHeight * 5,
		backgroundColor: 'white',
		borderRadius: 10
	},
	textandicon: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: DefaultStyles.DefaultPadding,
		paddingHorizontal: 20
	},
	borderBottom: {
		borderBottomWidth: 1,
		borderBottomColor: '#E8E8E8'
	}
});
