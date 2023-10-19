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
	maxLength: number;
}

interface PriceData {
	value: number;
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

const PriceFilter = ({
	low,
	high,
	setLow,
	setHigh,
	category,
	price,
	maxLength
}: PriceFilterProp) => {
	const renderThumb = useCallback(() => <Thumb />, []);

	const [isMinModalVisible, setIsMinModalVisible] = useState(false);
	const [isMinOptionPressed, setIsMinOptionPressed] = useState<number>(1);
	const [isMaxOptionPressed, setIsMaxOptionPressed] = useState<number>(maxLength);
	const [isMaxModalVisible, setIsMaxModalVisible] = useState(false);

	const [expanded, setExpanded] = useState(false);

	const togglerFilterDetails = () => {
		setExpanded(!expanded);
	};
	const findPriceSliderData = PRICE_SLIDER_DATA[category];

	const minPriceListData = findPriceSliderData?.min?.map((item, index) => {
		return { ...item, id: index + 1 };
	});

	const maxPriceListData = findPriceSliderData?.max?.map((item, index) => {
		return {
			...item,
			id: index + 1
		};
	});

	useEffect(() => {
		valueChangeCallBack();
	}, [low, high]);

	const assignOptionValue = (data: PriceData, isMin: boolean) => {
		const tempLabel = isMin ? low : high;
		const valueFind = data?.filter((item) => item?.label == tempLabel);
		if (valueFind?.length !== 0) {
			if (isMin) {
				setIsMinOptionPressed(valueFind[0].id);
			} else {
				setIsMaxOptionPressed(valueFind[0].id);
			}
		}
	};

	const valueChangeCallBack = useCallback(() => {
		assignOptionValue(minPriceListData, true);
		assignOptionValue(maxPriceListData, false);
	}, [low, high]);

	const assignOptionLabel = (data: PriceData, value: number, isMin: boolean) => {
		const valueFind = data?.filter((item) => item?.id == value);
		if (valueFind?.length !== 0) {
			if (isMin) {
				setLow(valueFind[0].label);
			} else {
				setHigh(valueFind[0].label);
			}
		}
	};

	const handleValueChange = useCallback((values: number[]) => {
		const low = values[0];
		const high = values[1];
		if (low) {
			assignOptionLabel(minPriceListData, low, true);
		}
		if (high) {
			assignOptionLabel(maxPriceListData, high, false);
		}
	}, []);

	const openMinPriceModal = () => {
		setIsMinModalVisible(true);
	};

	const openMaxPriceModal = () => {
		setIsMaxModalVisible(true);
	};

	const onPressMinOption = (value: number) => {
		setIsMinOptionPressed(value);
		setLow(minPriceListData?.filter((item) => item.id == value)[0]?.label);
	};

	const onPressMaxOption = (value: number) => {
		setIsMaxOptionPressed(value);
		setHigh(maxPriceListData?.filter((item) => item.id == value)[0]?.label);
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
						optionsArray={maxPriceListData?.map((item) => item.id)}
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
									priceData={minPriceListData}
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
									priceData={maxPriceListData}
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
