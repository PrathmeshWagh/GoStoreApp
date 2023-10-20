import { CustomButtom } from 'components/atoms';
import { CustomColors } from 'constants/colors.constants';
import { DefaultStyles } from 'primitives';
import { View, Text, StyleSheet } from 'react-native';

const offersData = [
	{
		id: 1,
		label: 'Flat 10% on DBS Credit Card'
	},
	{
		id: 2,
		label: '7.5% Off on One Card Credit Card EMI'
	},
	{
		id: 3,
		label: '10% Off on Bank Of Baroda Credit Card EMI'
	},
	{
		id: 4,
		label: '10% Off on Yes Bank  Credit Card EMI'
	}
];

const OfferList = ({ handleOfferSelection }) => {
	return (
		<>
			{offersData.map((offer) => (
				<View key={offer.id} style={styles.offerTextWithBtnBox}>
					<Text>{offer.label}</Text>
					<CustomButtom
						text="Apply"
						loading={false}
						disabled={false}
						onPress={() => handleOfferSelection(offer)}
						styles={styles.btnBox}
					/>
				</View>
			))}
		</>
	);
};

export default OfferList;

const styles = StyleSheet.create({
	offerTextWithBtnBox: {
		borderRadius: 5,
		backgroundColor: CustomColors.textGrey1,
		paddingHorizontal: DefaultStyles.DefaultPadding,
		paddingVertical: DefaultStyles.DefaultPadding - 5,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	btnBox: {
		width: '18%'
	}
});
