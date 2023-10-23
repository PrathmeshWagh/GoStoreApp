import { FlatList, Modal, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { CustomColors } from 'constants/colors.constants';
import { DefaultStyles, FontGilroy } from 'primitives';
import CardDetailsInputField from 'components/atoms/cardDetails-InputField.atom';
import AnimatedInputField from 'components/atoms/AnimatedInputField';
import CardDetailsDropDown from 'components/atoms/cardDetails-dropDown.atom';
import { CustomButtom } from 'components/atoms';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useEnhancedNavigation } from 'hooks';

const CardRegex = /^[0-9]{16}$/;

const CardDetailsVlidationSchema = yup.object().shape({
	cardNumber: yup
		.string()
		.required('Card Number is required')
		.matches(CardRegex, 'Invalid Card Number!'),
	name: yup.string().required('Name is required'),
	month: yup.string().required('Required'),
	year: yup.string().required('Required'),
	cvv: yup.string().required('CVV is required')
});

const CardDetails = () => {
	const { router } = useEnhancedNavigation();
	const param = router.params?.type;
	const now = new Date().getUTCFullYear() - 5;
	const yearsArray = Array(now - (now - 40))
		.fill('')
		.map((v, idx) => {
			const item = now + idx;
			return {
				label: item.toString(),
				value: item
			};
		});

	const monthsArray = Array.from({ length: 12 }, (_, index) => {
		const item = index + 1;
		return {
			label: item.toString(),
			value: item
		};
	});

	const { values, errors, touched, handleSubmit, setFieldValue } = useFormik({
		initialValues: { cardNumber: '', month: '', name: '', year: '', cvv: '' },
		validationSchema: CardDetailsVlidationSchema,
		onSubmit(values, formikHelpers) {}
	});

	return (
		<View style={styles.container}>
			<Text
				style={{
					fontFamily: FontGilroy.SemiBold,
					fontSize: 16,
					color: CustomColors.cardTxt,
					fontWeight: '700',
					marginBottom: 10
				}}
			>
				{`Please Enter ${param} Details`}
			</Text>
			<CardDetailsInputField
				value={values.cardNumber}
				onChangeText={(text) => {
					setFieldValue('cardNumber', text);
				}}
				error={errors.cardNumber && touched.cardNumber ? errors.cardNumber : ''}
			/>
			{errors.cardNumber && touched.cardNumber ? (
				<Text style={{ color: 'red' }}>{errors.cardNumber}</Text>
			) : null}
			<AnimatedInputField
				placeholder="Name"
				value={values.name}
				error={errors.name && touched.name ? errors.name : ''}
				style={{
					borderRadius: 10,
					paddingVertical: 10,
					marginTop: 25
				}}
				onChangeText={(text) => {
					setFieldValue('name', text);
				}}
				placeholderStyle={{
					fontFamily: FontGilroy.Regular,
					fontSize: 13,
					color: errors.name !== '' ? 'red' : CustomColors.cart
				}}
				textStyle={{
					fontFamily: FontGilroy.Regular,
					fontSize: 13,
					color: CustomColors.cart
				}}
				showAnimatedLabel
				placeholderTextColor={CustomColors.cart}
			/>
			<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 25 }}>
				<View style={{ width: '30%' }}>
					<CardDetailsDropDown
						onSelect={(text) => {
							setFieldValue('month', text);
						}}
						placeholder="Month"
						value={values.month}
						items={monthsArray}
						error={errors.month !== '' ? errors.month : ''}
					/>
					{errors.month !== '' ? (
						<Text
							style={{
								color: 'red'
							}}
						>
							{errors.month}
						</Text>
					) : null}
				</View>
				<View style={{ width: '30%' }}>
					<CardDetailsDropDown
						onSelect={(text) => {
							setFieldValue('year', text);
						}}
						placeholder="Year"
						value={values.year}
						items={yearsArray}
						error={errors.year !== '' ? errors.year : ''}
					/>
					{errors.year !== '' ? (
						<Text
							style={{
								color: 'red'
							}}
						>
							{errors.year}
						</Text>
					) : null}
				</View>
				<View style={{ width: '30%' }}>
					<AnimatedInputField
						placeholder="CVV"
						value={values.cvv}
						style={{
							borderRadius: 10,
							marginVertical: 0,
							height: 45,
							marginBottom: 5
						}}
						onChangeText={(text) => {
							setFieldValue('cvv', text);
						}}
						error={errors.cvv}
						showErrorText={false}
						placeholderStyle={{
							fontFamily: FontGilroy.Regular,
							fontSize: 13,
							color: errors.cvv !== '' ? 'red' : CustomColors.cart
						}}
						textStyle={{
							fontFamily: FontGilroy.Regular,
							fontSize: 13,
							color: CustomColors.cart,
							marginTop: 3
						}}
						keyboardType="numeric"
						showAnimatedLabel
						placeholderTextColor={CustomColors.cart}
						maxLength={3}
					/>
					{errors.cvv && touched.cvv ? <Text style={{ color: 'red' }}>{errors.cvv}</Text> : null}
				</View>
			</View>
			<CustomButtom
				styles={{
					marginVertical: 10,
					marginTop: 15
				}}
				text="Paynow"
				disabled={false}
				loading={false}
				onPress={handleSubmit}
			/>
		</View>
	);
};

export default CardDetails;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: CustomColors.white,
		paddingHorizontal: DefaultStyles.DefaultPadding,
		paddingVertical: 15
	},
	dropdownstyle: {
		borderWidth: 1,
		borderColor: CustomColors.grey,
		borderRadius: 10,
		paddingHorizontal: 10,
		paddingVertical: 7,
		width: '30%'
	},
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)'
	}
});
