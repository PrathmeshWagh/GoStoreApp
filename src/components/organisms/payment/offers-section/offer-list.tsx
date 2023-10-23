import { CustomButtom } from 'components/atoms';
import { CustomColors } from 'constants/colors.constants';
import { DefaultStyles, FontGilroy } from 'primitives';
import { View, Text, StyleSheet, Pressable } from 'react-native';

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
					<View>
						<Text style={{ fontSize: 12, color: CustomColors.cart, fontFamily: FontGilroy.Medium }}>
							{offer.label}
						</Text>
					</View>
					<View>
						{/* <CustomButtom
							text="Apply"
							loading={false}
							disabled={false}
							onPress={() => handleOfferSelection(offer)}
							styles={styles.btnBox}
						/> */}
						<Pressable
							style={{
								backgroundColor: CustomColors.primary,
								borderRadius: 5,
								padding: DefaultStyles.DefaultPadding - 10
							}}
						>
							<Text style={{ color: CustomColors.onSecondary, fontSize: 10 }}>Apply</Text>
						</Pressable>
					</View>
				</View>
			))}
		</>
	);
};

export default OfferList;

const styles = StyleSheet.create({
	offerTextWithBtnBox: {
		borderRadius: 5,
		backgroundColor: CustomColors.tertiary,
		paddingHorizontal: DefaultStyles.DefaultPadding,
		paddingVertical: DefaultStyles.DefaultPadding - 5,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginVertical: 10,
		width: '100%'
	},
	btnBox: {
		width: 20,
		height: 30,
		marginRight: 35
	}
});
