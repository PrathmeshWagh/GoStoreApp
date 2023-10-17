import { Text, View, StyleSheet, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import { CustomColors } from 'constants/colors.constants';
import { DefaultStyles, FontGilroy } from 'primitives';
import Divider from 'components/atoms/divider.atom';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckBox from 'react-native-check-box';

interface Props {
	filters: Array<object>;
	updateOtherSelectedFilter: () => void;
	resetFilter: () => void;
}

const OtherFilters: React.FC<Props> = ({ filters, updateOtherSelectedFilter, resetFilter }) => {
	const [expanded, setExpanded] = useState(new Array(filters?.length).fill(false));
	const [selectedFilter, setSelectedFilter] = useState({});

	const toggleOtherDetails = (filterIndex: number) => {
		const updatedExpanded = [...expanded];
		updatedExpanded[filterIndex] = !expanded[filterIndex];
		setExpanded(updatedExpanded);
	};

	useEffect(() => {
		if (resetFilter) {
			setSelectedFilter({});
		}
	}, [resetFilter]);

	const handleCheckBoxClick = (singlefilterOption: string, filter: any) => {
		let tempFilters = { ...selectedFilter };

		tempFilters.latestFilterObj = filter;

		if (tempFilters[filter?.attribute_name]?.length) {
			if (tempFilters[filter?.attribute_name].includes(singlefilterOption)) {
				tempFilters[filter?.attribute_name] = tempFilters[filter?.attribute_name]?.filter(
					(selFilt) => selFilt !== singlefilterOption
				);
			} else {
				tempFilters[filter?.attribute_name].push(singlefilterOption);
			}
		} else {
			tempFilters[filter?.attribute_name] = [singlefilterOption];
		}

		setSelectedFilter({ ...tempFilters });
	};

	useEffect(() => {
		updateOtherSelectedFilter(selectedFilter);
	}, [selectedFilter]);

	useEffect(() => {}, [selectedFilter]);

	return (
		<View style={{ paddingBottom: DefaultStyles.DefaultPadding + 5 }}>
			{filters?.map((filter, filterIndex: number) => (
				<View key={filterIndex}>
					<Pressable
						style={[styles.otherFilterOption]}
						onPress={() => toggleOtherDetails(filterIndex)}
					>
						<Text style={[styles.otherFilterText]}>{filter?.attribute_name}</Text>
						<Icon name={expanded[filterIndex] ? 'chevron-up' : 'chevron-down'} size={25} />
					</Pressable>
					{expanded[filterIndex] && (
						<View>
							{filter?.filter_option
								.split(',')
								.map((singlefilterOption: string, optionIndex: number) => (
									<CheckBox
										key={optionIndex}
										style={{ paddingTop: 5 }}
										onClick={() => handleCheckBoxClick(singlefilterOption, filter)}
										isChecked={
											(selectedFilter[filter?.attribute_name] || []).includes(singlefilterOption)
												? true
												: false
										}
										rightText={singlefilterOption}
										rightTextStyle={styles.brandText}
										checkedCheckBoxColor={CustomColors.primary}
										uncheckedCheckBoxColor={CustomColors.grey}
									/>
								))}
						</View>
					)}
					{filterIndex < filters?.length - 1 && (
						<Divider type="dashed" style={{ width: '92%', alignSelf: 'center' }} />
					)}
				</View>
			))}
		</View>
	);
};

export default OtherFilters;

const styles = StyleSheet.create({
	otherFilterOption: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 10
	},
	otherFilterText: {
		fontSize: 15,
		color: CustomColors.secondary,
		paddingLeft: 5,
		fontFamily: FontGilroy.Medium
	},
	brandText: {
		color: CustomColors.secondary,
		fontSize: 12,
		fontFamily: FontGilroy.Medium
	}
	// selectedValueText: {
	// 	fontFamily: FontGilroy.SemiBold
	// }
});
