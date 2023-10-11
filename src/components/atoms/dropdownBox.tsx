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
			<Text>{title}</Text>
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
	}
});
