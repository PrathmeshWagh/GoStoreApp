import { useState, useCallback, useEffect } from 'react';
import { View, Pressable, StyleSheet, Text, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CustomColors } from 'constants/colors.constants';
import { DefaultStyles, FontGilroy } from 'primitives';
import DropdownBox from 'components/atoms/dropdownBox';
import { PRICE_SLIDER_DATA } from 'helpers/constants/priceSliderContstants';
import PriceModal from 'components/atoms/priceModal';
import Slider from 'rn-range-slider';
import Thumb from 'components/atoms/Slider/Thumb';
import Rail from 'components/atoms/Slider/Rail';
import RailSelected from 'components/atoms/Slider/RailSelected';
import MaxPriceModal from 'components/atoms/maxPriceModal';
import MinPriceModal from 'components/atoms/minPriceModal';

interface PriceFilterProp {
	low: string;
	high: string;
	setLow: () => void;
	setHigh: () => void;
}

interface PriceData {
	id: number;
	label: string;
}

export interface ByPriceProps {
	price?: {
		minPrice?: number;
		maxPrice?: number;
	};
}

const PriceFilter = ({ low, high, setLow, setHigh, category, price }: ByPriceProps) => {
	console.log(price);

	const [rangeDisabled, setRangeDisabled] = useState(false);
	// const [low, setLow] = useState('6049');
	// const [high, setHigh] = useState('95649');
	const [min, setMin] = useState(6049);
	const [max, setMax] = useState(95649);
	const [priceRange, setPriceRange] = useState<any>();

	// console.log('priceRange', priceRange);

	const renderThumb = useCallback(() => <Thumb />, []);
	const renderRail = useCallback(() => <Rail />, []);
	const renderRailSelected = useCallback(() => <RailSelected />, []);

	const [isMinModalVisible, setIsMinModalVisible] = useState(false);
	const [isMinOptionPressed, setIsMinOptionPressed] = useState(1);
	const [isMaxOptionPressed, setIsMaxOptionPressed] = useState<number>(6);

	const [isMaxModalVisible, setIsMaxModalVisible] = useState(false);
	const [minPriceData, setMinPriceData] = useState<PriceData[]>([]);
	const [maxPriceData, setMaxPriceData] = useState<PriceData[]>([]);

	const [expanded, setExpanded] = useState(false);

	const togglerFilterDetails = () => {
		setExpanded(!expanded);
	};

	useEffect(() => {
		// let category: string = router?.query?.category?.toString();
		// category = category?.replace(' ', '_').toUpperCase();
		PRICE_SLIDER_DATA?.[category]
			? setPriceRange(PRICE_SLIDER_DATA?.[category])
			: setPriceRange(PRICE_SLIDER_DATA?.DEFAULT_VALUE);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [category]);
	// const renderNotch = useCallback(() => <Notch />, []);
	const handleValueChange = useCallback((low, high) => {
		if (low <= 10000) {
			setLow('min');
		} else if (low <= 15000) {
			setLow('15000');
		} else if (low <= 30000) {
			setLow('30000');
		} else if (low <= 40000) {
			setLow('40000');
		} else {
			setLow('60000');
		}

		if (high <= 15000) {
			setHigh('15000');
		} else if (high <= 30000) {
			setHigh('30000');
		} else if (high <= 40000) {
			setHigh('40000');
		} else if (high <= 50000) {
			setHigh('50000');
		} else if (high <= 60000) {
			setHigh('60000');
		} else {
			setHigh('60000+');
		}
	}, []);

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
						// style={styles.slider}
						min={min}
						max={max}
						step={5}
						renderThumb={renderThumb}
						renderRail={renderRail}
						renderRailSelected={renderRailSelected}
						// renderNotch={renderNotch}
						onValueChanged={handleValueChange}
						minRange={5}
					/>

					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							paddingVertical: DefaultStyles.DefaultPadding
						}}
					>
						<DropdownBox style={styles.dropdownstyle} title={low} onBoxPress={openMinPriceModal} />
						<Modal animationType="fade" transparent={true} visible={isMinModalVisible}>
							<View style={styles.centeredView}>
								<MinPriceModal
									setModalVisible={() => setIsMinModalVisible(false)}
									priceData={minPriceData}
									isMinOptionPressed={isMinOptionPressed}
									setIsMinOptionPressed={setIsMinOptionPressed}
								/>
							</View>
						</Modal>

						<DropdownBox style={styles.dropdownstyle} title={high} onBoxPress={openMaxPriceModal} />
						<Modal animationType="fade" transparent={true} visible={isMaxModalVisible}>
							<View style={styles.centeredView}>
								<MaxPriceModal
									setModalVisible={() => setIsMaxModalVisible(false)}
									priceData={maxPriceData}
									isMaxOptionPressed={isMaxOptionPressed}
									setIsMaxOptionPressed={setIsMaxOptionPressed}
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
