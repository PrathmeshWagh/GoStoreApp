import { useState } from 'react';
import { View, Pressable, StyleSheet, Text, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CustomColors } from 'constants/colors.constants';
import { DefaultStyles, FontGilroy } from 'primitives';
import Slider from '@react-native-community/slider';
import DropdownBox from 'components/atoms/dropdownBox';
import PriceModal from 'components/atoms/priceModal';

interface PriceData {
	id: number;
	label: string;
}

const PriceFilter = () => {
	const [isMinModalVisible, setIsMinModalVisible] = useState(false);
	const [isMaxModalVisible, setIsMaxModalVisible] = useState(false);
	const [minPriceData, setMinPriceData] = useState<PriceData[]>([]);
	const [maxPriceData, setMaxPriceData] = useState<PriceData[]>([]);
	const [expanded, setExpanded] = useState(false);

	const togglerFilterDetails = () => {
		setExpanded(!expanded);
	};

	const openMinPriceModal = () => {
		setMinPriceData([
			{ id: 1, label: 'min' },
			{ id: 2, label: '10000' },
			{ id: 3, label: '20000' },
			{ id: 4, label: '30000' },
			{ id: 5, label: '40000' },
			{ id: 6, label: '50000' }
		]);
		setIsMinModalVisible(true);
	};

	const openMaxPriceModal = () => {
		setMaxPriceData([
			{ id: 1, label: '15000' },
			{ id: 2, label: '30000' },
			{ id: 3, label: '40000' },
			{ id: 4, label: '50000' },
			{ id: 5, label: '60000' },
			{ id: 6, label: '60000+' }
		]);
		setIsMaxModalVisible(true);
	};

	return (
		<View>
			<Pressable style={[styles.filterinfo]} onPress={togglerFilterDetails}>
				<Text style={[styles.optionText]}>Price</Text>
				<Icon name={expanded ? 'chevron-up' : 'chevron-down'} size={25} />
			</Pressable>
			{expanded && (
				<>
					<Slider
						style={{ width: '100%', height: 40 }}
						minimumValue={0}
						maximumValue={1}
						minimumTrackTintColor={CustomColors.primary}
						maximumTrackTintColor={CustomColors.grey}
					/>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							paddingBottom: DefaultStyles.DefaultPadding
						}}
					>
						<DropdownBox
							style={styles.dropdownstyle}
							title={'min'}
							onBoxPress={openMinPriceModal}
						/>
						<Modal animationType="fade" transparent={true} visible={isMinModalVisible}>
							<View style={styles.centeredView}>
								<PriceModal
									setModalVisible={() => setIsMinModalVisible(false)}
									priceData={minPriceData}
								/>
							</View>
						</Modal>

						<DropdownBox
							style={styles.dropdownstyle}
							title={50000}
							onBoxPress={openMaxPriceModal}
						/>
						<Modal animationType="fade" transparent={true} visible={isMaxModalVisible}>
							<View style={styles.centeredView}>
								<PriceModal
									setModalVisible={() => setIsMaxModalVisible(false)}
									priceData={maxPriceData}
								/>
							</View>
						</Modal>
					</View>
				</>
			)}
		</View>
	);
};

export default PriceFilter;

const styles = StyleSheet.create({
	filterinfo: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 10
	},
	optionText: {
		alignItems: 'center',
		justifyContent: 'center',
		fontSize: 15,
		color: CustomColors.secondary,
		paddingLeft: 5,
		fontFamily: FontGilroy.Medium
	},
	dropdownstyle: {
		width: '42%',
		// paddingVertical: 5,
		borderWidth: 1,
		borderColor: CustomColors.primary,
		borderRadius: 5
	},
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)'
	}
});
