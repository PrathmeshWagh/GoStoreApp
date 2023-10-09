import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useTheme } from '@hooks/index';
import { DefaultStyles, FontGilroy } from '@primitives/index';
import { CustomButtom } from 'components/atoms';
import { useCheckPincodeServiceabilityMutation } from 'api/checkout/check-pincode-serviceability';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import { tableHead, tableData } from 'helpers/constants/product/assured-table';

interface AssuredProps {
	onPress: () => void;
}

export default function AssuredBuyBackModal(props: AssuredProps) {
	const { onPress } = props;

	const [tnc, setTnc] = useState<boolean>(false);
	const { colors } = useTheme();

	const [pincode, setPincode] = useState<string>('');
	const [isPincodeMsgVisible, setIsPicodeMsgVisible] = useState<boolean>(false);

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
			<Text style={[styles.text, { marginVertical: 8 }]}>
				Buyback Plan is facilitated by Gostor which assures you a fixed buyback price up to 5 years
				for your used products purchased from Gostor.
			</Text>

			<Table borderStyle={{ borderWidth: 1 }}>
				<Row data={tableHead} style={styles.head} flexArr={[2, 3]} textStyle={styles.text} />
				<TableWrapper style={styles.wrapper}>
					<Rows data={tableData} flexArr={[2, 3]} style={styles.row} textStyle={styles.text} />
				</TableWrapper>
			</Table>

			<Text style={[styles.header, { marginTop: 10 }]}>Check Serviciability:</Text>
			<View style={[styles.inputField, { borderColor: colors.primary }]}>
				<TextInput
					maxLength={6}
					placeholder="Enter Pincode"
					keyboardType="numeric"
					style={{ flex: 1 }}
					onChangeText={(text) => {
						setIsPicodeMsgVisible(false);
						setPincode(text);
					}}
				/>
				<CustomButtom
					loading={pincodeServiceabilityLoading}
					onPress={onCheckPincodeServiceabilityPress}
					mode="text"
					text="Apply"
					disabled={pincode.length !== 6}
					styles={{
						height: DefaultStyles.DefaultButtonHeight - 6,
						borderRadius: DefaultStyles.DefaultButtonHeight - 40,
						backgroundColor: pincode.length !== 6 ? colors.onSecondary : colors.primary,
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
						<Icon name={'square'} color={colors.grey} size={22} />
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
					height: DefaultStyles.DefaultButtonHeight - 5,
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
		borderRadius: 8,
		marginBottom: 8
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
		height: 40
	},
	wrapper: {
		flexDirection: 'row'
	},
	title: {
		flex: 1
	},
	row: {
		height: 40
	},
	text: {
		textAlign: 'center',
		fontSize: 14
	},
	inputField: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderRadius: 10,
		borderBottomWidth: 1
	}
});
