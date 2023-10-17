import { CustomColors } from 'constants/colors.constants';
import { DefaultStyles, FontGilroy } from 'primitives';
import { Pressable, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface DropdownBoxProps {
	style?: any;
	title?: string | number;
	onBoxPress?: () => void;
}

const DropdownBox = (props: DropdownBoxProps) => {
	const { style, title, onBoxPress } = props;

	return (
		<Pressable style={[styles.titleandicon, style]} onPress={onBoxPress}>
			<Text style={styles.title}>{title}</Text>
			<Icon name="chevron-down" size={25} />
		</Pressable>
	);
};

export default DropdownBox;
const styles = StyleSheet.create({
	titleandicon: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	title: {
		fontSize: 16,
		paddingLeft: DefaultStyles.DefaultPadding - 5,
		fontFamily: FontGilroy.Medium,
		color: CustomColors.secondary
	}
});
