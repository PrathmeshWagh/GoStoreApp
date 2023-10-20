import { DefaultStyles, FontGilroy } from 'primitives';
import { useCallback, useEffect, useState } from 'react';
import { View, Modal, StyleSheet, Text, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CustomColors } from 'constants/colors.constants';

interface PriceModalProps {
	setModalVisible?: boolean;
	priceData: { id: number; value: number; label: string }[];
	isMinOptionPressed: number;
	setIsMinOptionPressed: (value: number) => void;
}

const MinPriceModal = (props: PriceModalProps) => {
	const { setModalVisible, priceData, setIsMinOptionPressed, isMinOptionPressed } = props;

	const closeModal = (value: number) => {
		setIsMinOptionPressed(value);
		setModalVisible(false);
	};
	return (
		<>
			<View style={styles.modalView}>
				{priceData?.map((price, index) => (
					<Pressable
						key={index}
						style={[styles.textandicon, index < priceData.length - 1 && styles.borderBottom]}
						onPress={() => closeModal(price.id)}
					>
						<Text key={index} style={styles.optionText}>
							{price.label}
						</Text>
						{isMinOptionPressed === price.id ? (
							<Icon name="circle-slice-8" size={20} color={CustomColors.primary} />
						) : (
							<Icon name="circle-outline" size={20} />
						)}
					</Pressable>
				))}
			</View>
		</>
	);
};

export default MinPriceModal;
const styles = StyleSheet.create({
	modalView: {
		width: '95%',
		height: DefaultStyles.DefaultHeight * 6,
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
	},
	optionText: {
		color: CustomColors.secondary,
		fontSize: 17,
		fontFamily: FontGilroy.Medium
	}
});
