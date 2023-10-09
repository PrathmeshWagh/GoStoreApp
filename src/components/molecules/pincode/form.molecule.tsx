import React, { useRef, useEffect } from 'react';
import { TextInput, Text } from 'react-native-paper';
import { View, StyleSheet, Platform } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { pincodeSchema } from '@helpers/validators.helpers';
import { useTheme } from '@hooks/index';
import { CustomButtom } from '@atoms/index';
import { DefaultStyles } from '@primitives/index';
import { container } from '@helpers/index';
import { usePincode } from 'api/location/update-pincode.api';

const Header = () => {
	const inputRef = useRef<any>(null);
	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
		watch
	} = useForm({
		resolver: yupResolver(pincodeSchema)
	});
	const { colors } = useTheme();
	const pincode = watch('pincode');
	const { isLoading, refetch } = usePincode(pincode, reset);

	useEffect(() => {
		inputRef.current && inputRef.current.focus();
	}, []);

	const submit = () => {
		refetch();
	};

	return (
		<View style={[styles.container]}>
			<View style={[styles.inputWrapper]}>
				<Controller
					control={control}
					rules={{
						maxLength: 6
					}}
					name="pincode"
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							ref={inputRef}
							label="Enter pincode"
							onBlur={onBlur}
							onChangeText={onChange}
							maxLength={6}
							value={value}
							mode="outlined"
							placeholder="EX:524415"
							keyboardType="number-pad"
							style={[styles.input]}
							error={errors.pincode && errors.pincode?.message !== ''}
						/>
					)}
				/>
				{errors.pincode && errors.pincode?.message !== '' && (
					<Text style={[{ color: colors.error }]} variant="labelSmall">
						{errors.pincode?.message}
					</Text>
				)}
			</View>
			<View style={[styles.footer]}>
				<CustomButtom
					mode="elevated"
					onPress={handleSubmit(submit)}
					uppercase
					loading={isLoading}
					disabled={isLoading}
					text="submit"
					styles={{ ...container() }}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	inputWrapper: {
		flex: 1,
		marginBottom: DefaultStyles.DefaultPadding
	},
	input: {
		height: 52,
		fontWeight: '500'
	},
	footer: {
		flexDirection: 'row',
		marginBottom:
			Platform.OS === 'ios'
				? DefaultStyles.DefaultButtonHeight + 20
				: DefaultStyles.DefaultButtonHeight
	}
});

export default Header;
