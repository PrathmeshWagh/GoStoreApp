import { useState, useCallback, useEffect } from 'react';
import {
	View,
	Pressable,
	StyleSheet,
	Text,
	Modal,
	TouchableOpacity,
	Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CustomColors } from 'constants/colors.constants';
import { DefaultStyles, FontGilroy } from 'primitives';
import DropdownBox from 'components/atoms/dropdownBox';
import { PRICE_SLIDER_DATA } from 'helpers/constants/priceSliderContstants';
import Thumb from 'components/atoms/Slider/Thumb';
import Rail from 'components/atoms/Slider/Rail';
import RailSelected from 'components/atoms/Slider/RailSelected';
import MaxPriceModal from 'components/atoms/maxPriceModal';
import MinPriceModal from 'components/atoms/minPriceModal';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
interface PriceFilterProp {
	low: string;
	high: string;
	setLow: React.Dispatch<React.SetStateAction<string>>;
	setHigh: React.Dispatch<React.SetStateAction<string>>;
	price?: ByPriceProps;
	category: any;
}

interface PriceData {
	id: number;
	label: string;
}

export interface ByPriceProps {
	minPrice?: number;
	maxPrice?: number;
}

const minPriceList = [
	{ id: 1, label: 'min' },
	{ id: 2, label: '10000' },
	{ id: 3, label: '15000' },
	{ id: 4, label: '30000' },
	{ id: 5, label: '40000' },
	{ id: 6, label: '50000' }
];

const maxPriceList = [
	{ id: 1, label: '15000' },
	{ id: 2, label: '30000' },
	{ id: 3, label: '40000' },
	{ id: 4, label: '50000' },
	{ id: 5, label: '60000' },
	{ id: 6, label: '60000+' }
];

const PriceFilter = ({ low, high, setLow, setHigh, category, price }: PriceFilterProp) => {
	const [priceRange, setPriceRange] = useState<any>();
	const renderThumb = useCallback(() => <Thumb />, []);

	const [isMinModalVisible, setIsMinModalVisible] = useState(false);
	const [isMinOptionPressed, setIsMinOptionPressed] = useState<number>(1);
	const [isMaxOptionPressed, setIsMaxOptionPressed] = useState<number>(6);

	const [isMaxModalVisible, setIsMaxModalVisible] = useState(false);
	const [minPriceData, setMinPriceData] = useState<PriceData[]>(minPriceList);
	const [maxPriceData, setMaxPriceData] = useState<PriceData[]>(maxPriceList);

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
	useEffect(() => {
		valueChangeCallBack();
	}, [low, high]);

	const valueChangeCallBack = useCallback(() => {
		if (low == '10000') {
			setIsMinOptionPressed(2);
		} else if (low == '15000') {
			setIsMinOptionPressed(3);
		} else if (low == '30000') {
			setIsMinOptionPressed(4);
		} else if (low == '40000') {
			setIsMinOptionPressed(5);
		} else if (low == '50000') {
			setIsMinOptionPressed(6);
		} else {
			setIsMinOptionPressed(1);
		}
		if (high == '15000') {
			setIsMaxOptionPressed(1);
		} else if (high == '30000') {
			setIsMaxOptionPressed(2);
		} else if (high == '40000') {
			setIsMaxOptionPressed(3);
		} else if (high == '50000') {
			setIsMaxOptionPressed(4);
		} else if (high == '60000') {
			setIsMaxOptionPressed(5);
		} else {
			setIsMaxOptionPressed(6);
		}
	}, [low, high]);

	const handleValueChange = useCallback((values: number[]) => {
		const low = values[0];
		const high = values[1];
		if (low == 1) {
			setLow('min');
		} else if (low == 2) {
			setLow('10000');
		} else if (low == 3) {
			setLow('15000');
		} else if (low == 4) {
			setLow('30000');
		} else if (low == 5) {
			setLow('40000');
		} else {
			setLow('50000');
		}
		if (high == 1) {
			setHigh('15000');
		} else if (high == 2) {
			setHigh('30000');
		} else if (high == 3) {
			setHigh('40000');
		} else if (high == 4) {
			setHigh('50000');
		} else if (high == 5) {
			setHigh('60000');
		} else {
			setHigh('60000+');
		}
	}, []);

	const openMinPriceModal = () => {
		setIsMinModalVisible(true);
	};

	const openMaxPriceModal = () => {
		setIsMaxModalVisible(true);
	};

	const onPressMinOption = (id: number) => {
		setIsMinOptionPressed(id);
		setLow(minPriceList.filter((item) => item.id == id)[0].label);
	};

	const onPressMaxOption = (id: number) => {
		setIsMaxOptionPressed(id);
		setHigh(maxPriceList.filter((item) => item.id == id)[0].label);
	};

	return (
		<View>
			<Pressable style={[styles.filterinfo]} onPress={togglerFilterDetails}>
				<Text style={[styles.optionText]}>Price</Text>
				<Icon name={expanded ? 'chevron-up' : 'chevron-down'} size={25} />
			</Pressable>
			{expanded && (
				<>
					<MultiSlider
						trackStyle={{ backgroundColor: '#bdc3c7' }}
						selectedStyle={{ height: 3.5, backgroundColor: CustomColors.primary, borderRadius: 2 }}
						values={[isMinOptionPressed, isMaxOptionPressed]}
						onValuesChange={handleValueChange}
						min={isMinOptionPressed}
						max={isMaxOptionPressed}
						step={6}
						sliderLength={Dimensions.get('window').width - 40 * 2}
						allowOverlap={true}
						customMarkerLeft={renderThumb}
						customMarkerRight={renderThumb}
						snapped={true}
						unselectedStyle={{
							height: 3.5,
							borderRadius: 2,
							backgroundColor: CustomColors.tertiary
						}}
						containerStyle={{
							alignSelf: 'center'
						}}
						isMarkersSeparated={true}
						optionsArray={[1, 2, 3, 4, 5, 6]}
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
									setIsMinOptionPressed={onPressMinOption}
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
									setIsMaxOptionPressed={onPressMaxOption}
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
