import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useTheme } from '@hooks/index';
import { DefaultStyles, FontGilroy } from '@primitives/index';
import { CustomButtom } from 'components/atoms';
import { useCheckPincodeServiceabilityMutation } from 'api/checkout/check-pincode-serviceability';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';

export default function AssuredBuyBackModal({ onPress }: any) {
	const [tnc, setTnc] = useState<boolean>(false);
	const { colors } = useTheme();

	const [pincode, setPincode] = useState<string>('');
	const [isPincodeMsgVisible, setIsPicodeMsgVisible] = useState(false);

	const tableHead = ['Buy Back Period', 'Guaranteed Assured Buyback Price'];
	const tableData = [
		['6-12 Months', 'Get 60% of Appliance Invoice price.'],
		['13-24 Months', 'Get 50% of Appliance Invoice price.'],
		['25-36 Months', 'Get 40% of Appliance Invoice price.'],
		['37-48 Months', 'Get 30% of Appliance Invoice price.'],
		['49-60 Months', 'Get 20% of Appliance Invoice price.']
	];

	const {
		mutate: checkPincodeServiceability,
		isLoading: pincodeServiceabilityLoading,
		data: pincodeServiceabilityResponse,
		isError: pincodeServiceabilityError,
		error: pincodeServiceabilityErrorResponse
	} = useCheckPincodeServiceabilityMutation();

	const renderServiceabilityCheckFeedback = () => {
		if (!pincodeServiceabilityResponse && !pincodeServiceabilityError) {
			return null;
		}

		let textStyle = { color: 'red' };
		let message = 'Sorry, this product is not available in this pincode';

		if (pincodeServiceabilityError) {
			message = 'Serviceability check failed, please try again';
		}

		if (pincodeServiceabilityResponse?.data?.serviceability) {
			textStyle = { color: 'green' };
			message = 'Product is available in this pincode';
		}

		return <Text style={[styles.feedbackText, textStyle]}>{message}</Text>;
	};

	const onCheckPincodeServiceabilityPress = () => {
		renderServiceabilityCheckFeedback();
		setIsPicodeMsgVisible(true);
		checkPincodeServiceability({
			productId: '6360eec564cb95ecdd4b7a99',
			pincode
		});
	};

	return (
		<View style={styles.container}>
			<Text style={[styles.header, styles.text]}>What is Buy Back Guarantee?</Text>
			<Text style={[styles.text, { marginBottom: 10 }]}>
				Buyback Plan is facilitated by Gostor which assures you a fixed buyback price up to 5 years
				for your used products purchased from Gostor.
			</Text>

			<Table borderStyle={{ borderWidth: 1 }}>
				<Row data={tableHead} style={styles.head} flexArr={[2, 3]} textStyle={styles.text} />
				<TableWrapper style={styles.wrapper}>
					<Rows data={tableData} flexArr={[2, 3]} style={styles.row} textStyle={styles.text} />
				</TableWrapper>
			</Table>

			<Text style={styles.header}>Check Serviciability:</Text>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
					borderColor: colors.primary,
					borderRadius: 10,

					borderBottomWidth: 1
				}}
			>
				<TextInput
					maxLength={6}
					placeholder="Enter PIN code"
					keyboardType="numeric"
					style={{ flex: 1 }}
					onChangeText={(text) => {
						setIsPicodeMsgVisible(false);
						setPincode(text);
					}}
				/>
				<CustomButtom
					loading={false}
					onPress={() => {
						onCheckPincodeServiceabilityPress();
					}}
					mode="text"
					text="Apply"
					disabled={pincode.length !== 6}
					styles={{
						height: DefaultStyles.DefaultButtonHeight,
						borderRadius: DefaultStyles.DefaultButtonHeight - 40,
						backgroundColor: pincode.length !== 6 ? 'white' : colors.primary,
						borderColor: colors.tertiary,
						borderWidth: 1
					}}
					textStyles={[
						styles.buttonText,
						{ color: pincode.length !== 6 ? colors.tertiary : colors.onSecondary }
					]}
				/>
			</View>
			{isPincodeMsgVisible && renderServiceabilityCheckFeedback()}
			<View style={styles.flexing}>
				<TouchableOpacity
					style={styles.tnc}
					onPress={() => {
						setTnc(!tnc);
					}}
				>
					{!tnc ? (
						<Icon name={'square'} color={'#A2A2A2'} size={22} />
					) : (
						<Icon
							name={'check'}
							color={colors.onSecondary}
							size={18}
							style={{
								backgroundColor: colors.primary,
								borderRadius: 5
							}}
						/>
					)}
				</TouchableOpacity>
				<Text style={[{ fontSize: 12 }, styles.labelFont]}>
					I agree to the
					<Text style={styles.underline}>Term & Conditions</Text>
				</Text>
			</View>

			<CustomButtom
				loading={false}
				onPress={onPress}
				mode="text"
				text="Add Plan"
				disabled={false}
				styles={{
					height: DefaultStyles.DefaultButtonHeight,
					borderRadius: DefaultStyles.DefaultButtonHeight - 40,
					backgroundColor: colors.primary,
					marginTop: 10
				}}
				textStyles={[styles.buttonText]}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 16,
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 8,
		marginBottom: 16
	},
	header: {
		fontFamily: FontGilroy.Bold
	},
	flexing: {
		marginTop: 10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start'
	},
	tnc: {
		marginRight: 8,
		marginTop: 1
	},
	underline: {
		textDecorationLine: 'underline',
		fontFamily: FontGilroy.Bold
	},
	labelFont: {
		fontFamily: FontGilroy.Medium
	},
	buttonText: {
		fontFamily: FontGilroy.SemiBold,
		marginTop: 8
	},
	feedbackText: {
		fontFamily: FontGilroy.Medium,
		fontSize: 12,
		marginBottom: 10
	},
	head: {
		height: 40,
		backgroundColor: '#f6f8fa'
	},
	wrapper: {
		flexDirection: 'row'
	},
	title: {
		flex: 1,
		backgroundColor: '#f6f8fa'
	},
	row: {
		height: 40
	},
	text: {
		textAlign: 'center'
	}
});
