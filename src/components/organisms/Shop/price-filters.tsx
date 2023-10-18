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

{
	/*
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

interface ByPriceProps {
	price?: {
		minPrice?: number;
		maxPrice?: number;
	};
}
const priceFilterMap = new Map([
	[0, 0],
	[20, 1],
	[40, 2],
	[60, 3],
	[80, 4],
	[100, 5]
]);

function PriceFilter({ high, setLow, setHigh, category, price }: ByPriceProps) {
	// const [rangeDisabled, setRangeDisabled] = useState(false);
	// // const [low, setLow] = useState('6049');
	// // const [high, setHigh] = useState('95649');
	// const [min, setMin] = useState(6049);
	// const [max, setMax] = useState(95649);
	// const [priceRange, setPriceRange] = useState<any>();
	// const renderThumb = useCallback(() => <Thumb />, []);
	// const renderRail = useCallback(() => <Rail />, []);
	// const renderRailSelected = useCallback(() => <RailSelected />, []);
	// const [isMinModalVisible, setIsMinModalVisible] = useState(false);
	// const [isMinOptionPressed, setIsMinOptionPressed] = useState(1);
	// const [isMaxOptionPressed, setIsMaxOptionPressed] = useState<number>(6);
	// const [isMaxModalVisible, setIsMaxModalVisible] = useState(false);
	// const [minPriceData, setMinPriceData] = useState<PriceData[]>([]);
	// const [maxPriceData, setMaxPriceData] = useState<PriceData[]>([]);
	const [expanded, setExpanded] = useState(false);
	const [isMinModalVisible, setIsMinModalVisible] = useState(false);
	const [isMaxModalVisible, setIsMaxModalVisible] = useState(false);
	const renderThumb = useCallback(() => <Thumb />, []);
	const renderRail = useCallback(() => <Rail />, []);
	const renderRailSelected = useCallback(() => <RailSelected />, []);

	const [sliderMin, setSliderMin] = useState(0);
	const [sliderMax, setSliderMax] = useState(100);
	const [priceRange, setPriceRange] = useState<any>();
	const [maxDataOptions, setMaxDataOptions] = useState(priceRange?.max);
	const [minDataOptions, setMinDataOptions] = useState(priceRange?.min);
	const [minValue, setMinValue] = useState(priceRange?.min[0]?.label);
	const [maxValue, setMaxValue] = useState(priceRange?.max[priceRange?.max?.length - 1]?.label);
	const isPriceFilterApplied = Boolean(price?.maxPrice || price?.minPrice);

	const togglerFilterDetails = () => {
		setExpanded(!expanded);
	};

	useEffect(() => {
		const maxVal = Number(price?.maxPrice);
		const minVal = Number(price?.minPrice);
		if (maxVal || minVal) {
			if (maxVal === 100000000) {
				setSliderMax(100);
			} else {
				let id = getPriceIndexFromRange(maxVal, 'max');
				setSliderMax(getKeyFromPriceFilterMap(id));
			}
			let id = getPriceIndexFromRange(minVal, 'min');
			setSliderMin(getKeyFromPriceFilterMap(id));
			const maxValue = getPriceJsonFromRange(maxVal, 'max');
			const minValue = getPriceJsonFromRange(minVal, 'min');
			setMaxSelectOptions(priceRange, minValue?.value);
			setMinSelectOptions(priceRange, maxValue?.value);
			setMaxValue(maxValue?.label);
			setMinValue(minValue?.label);
		} else {
			setMaxDataOptions(priceRange?.max);
			setMinDataOptions(priceRange?.min);
			setMaxValue(priceRange?.max[priceRange?.max?.length - 1]?.label);
			setMinValue(priceRange?.min[0]?.label);
			setSliderMin(0);
			setSliderMax(100);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [price?.maxPrice, price?.minPrice, price, priceRange]);

	useEffect(() => {
		// let category: string = router?.query?.category?.toString();
		// category = category?.replace(' ', '_').toUpperCase();
		PRICE_SLIDER_DATA?.[category]
			? setPriceRange(PRICE_SLIDER_DATA?.[category])
			: setPriceRange(PRICE_SLIDER_DATA?.DEFAULT_VALUE);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [category]);

	const setMaxSelectOptions = (priceRange, minVal) => {
		const maxDataOptions = priceRange?.max?.filter((val) => {
			return val?.value > minVal;
		});
		setMaxDataOptions(maxDataOptions);
	};

	const setMinSelectOptions = (priceRange, maxVal) => {
		const minDataOptions = priceRange?.min?.filter((val) => {
			return val?.value < maxVal;
		});
		setMinDataOptions(minDataOptions);
	};

	const handlePriceRange = async (value) => {
		if (value[0] < value[1]) {
			// min value comes as 99 if min slider is moved to right end
			const minSliderVal = value[0] === 99 ? 100 : value[0];
			const maxSliderVal = value[1] === 1 ? 0 : value[1];
			setSliderMin(minSliderVal);
			setSliderMax(maxSliderVal);
			let minVal = priceFilterMap.get(minSliderVal);
			setMinValue(priceRange.min[minVal]?.value?.toString());
			let maxVal = priceFilterMap.get(maxSliderVal);
			setMaxValue(priceRange.max[maxVal]?.value?.toString());
			setMaxSelectOptions(priceRange, priceRange.min[minVal]?.value);
			setMinSelectOptions(priceRange, priceRange.max[maxVal]?.value);
			updatePriceFilter(
				priceRange.min[minVal]?.value.toString(),
				priceRange.max[maxVal]?.value.toString()
			);
		}
	};

	function getKeyFromPriceFilterMap(value) {
		return Array.from(priceFilterMap).find(([key, val]) => val == value)?.[0];
	}

	const getPriceIndexFromRange = (val, label = 'max') => {
		const index = priceRange?.[label].findIndex((item) => {
			return item.value === val;
		});
		return index;
	};

	const getPriceJsonFromRange = (val, label = 'max') => {
		const priceJson = priceRange?.[label].find((item) => {
			return item.value === val;
		});
		return priceJson;
	};

	const getPriceJsonFromRangeLabel = (val, label = 'max') => {
		const priceJson = priceRange?.[label].find((item) => {
			return item.label === val;
		});
		return priceJson;
	};

	const handleMinChange = (event) => {
		let minVal = event.target.value;
		setMinValue(minVal);
		setSliderMin(getKeyFromPriceFilterMap(event.target.selectedIndex));
		setMaxSelectOptions(priceRange, priceRange.min[minVal]?.value);
		updatePriceFilter(
			getPriceJsonFromRange(Number(minVal), 'min')?.value,
			getPriceJsonFromRangeLabel(maxValue, 'max')?.value
		);
	};

	const handleMaxChange = (event) => {
		let maxVal = event.target.value;
		setMaxValue(maxVal);
		if (maxVal == 100000000) {
			setSliderMax(100);
		} else {
			let id = getPriceIndexFromRange(maxVal, 'max');
			setSliderMax(getKeyFromPriceFilterMap(id));
		}
		setMinSelectOptions(priceRange, priceRange.max[maxVal]?.value);
		updatePriceFilter(
			getPriceJsonFromRangeLabel(minValue, 'min')?.value,
			getPriceJsonFromRange(Number(maxVal), 'max')?.value
		);

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
			// setMinPriceData([
			// 	{ id: 1, label: 'min' },
			// 	{ id: 2, label: '10000' },
			// 	{ id: 3, label: '20000' },
			// 	{ id: 4, label: '30000' },
			// 	{ id: 5, label: '40000' },
			// 	{ id: 6, label: '50000' }
			// ]);
			setIsMinModalVisible(true);
		};

		const openMaxPriceModal = () => {
			// setMaxPriceData([
			// 	{ id: 1, label: '15000' },
			// 	{ id: 2, label: '30000' },
			// 	{ id: 3, label: '40000' },
			// 	{ id: 4, label: '50000' },
			// 	{ id: 5, label: '60000' },
			// 	{ id: 6, label: '60000+' }
			// ]);
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
							min={sliderMin}
							max={sliderMax}
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
							<DropdownBox
								style={styles.dropdownstyle}
								title={minValue}
								onBoxPress={openMinPriceModal}
							/>
							<Modal animationType="fade" transparent={true} visible={isMinModalVisible}>
								<View style={styles.centeredView}>
									<MinPriceModal
										setModalVisible={() => setIsMinModalVisible(false)}
										priceData={minDataOptions}
										isMinOptionPressed={minValue}
										setIsMinOptionPressed={setIsMinOptionPressed}
										onOptionPress={handleMinChange}
									/>
								</View>
							</Modal>

							<DropdownBox
								style={styles.dropdownstyle}
								title={high}
								onBoxPress={openMaxPriceModal}
							/>
							<Modal animationType="fade" transparent={true} visible={isMaxModalVisible}>
								<View style={styles.centeredView}>
									<MaxPriceModal
										setModalVisible={() => setIsMaxModalVisible(false)}
										priceData={maxDataOptions}
										isMaxOptionPressed={maxValue}
										setIsMaxOptionPressed={setIsMaxOptionPressed}
										onOptionPress={handleMaxChange}
									/>
								</View>
							</Modal>
						</View>
					</>
				)}
			</View>
		);
	};
}

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

	*/
}
