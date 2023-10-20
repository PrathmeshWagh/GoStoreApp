import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Keyboard } from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Text, TouchableRipple } from 'react-native-paper';

import { loginValidationSchema } from '@helpers/validators.helpers';
import { DefaultStyles, FontGilroy } from '@primitives/index';
import { CustomButtom, CustomInput } from '@atoms/index';
import { centerBoth, textAlign } from '@helpers/index';
import { useGenerateOtpMutation } from '@api/auth/use-generate-otp';
import { useTheme } from '@hooks/index';

const Form = () => {
    const inputRef = useRef<any>(null);
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(loginValidationSchema),
    });
    const { mutate: getOtp, isLoading } = useGenerateOtpMutation();
    const { colors } = useTheme();

    useEffect(() => {
        inputRef.current && inputRef.current.focus();
    }, []);

    const onSubmit = (data: { mobileNumber: string }) => {
        const { mobileNumber } = data;
        Keyboard.dismiss();
        getOtp({ mobile: mobileNumber });
    };

    return (
        <View style={[ styles.container ]}>
            <CustomInput
                ref={inputRef}
                control={control}
                name="mobileNumber"
                label="Enter your phone number"
                placeholder="Ex:9972380619"
                keyboardType="number-pad"
                errorMessage={errors.mobileNumber?.message}
                maxLength={10}
            />
            <View style={[styles.textWrapper]}>
                <Text variant="titleMedium" style={{ ...textAlign('center'), lineHeight: DefaultStyles.DefaultPadding }}>
                    By continuing, you agree to GoStor's{' '}
                </Text>
                <TouchableRipple>
                    <Text variant="titleMedium">
                        Term & Conditions and Privacy Policy
                    </Text>
                </TouchableRipple>
            </View>
            <View style={[ styles.footer ]}>
                <CustomButtom
                    mode="elevated"
                    onPress={handleSubmit(onSubmit)}
                    uppercase
                    loading={isLoading}
                    disabled={isLoading}
                    text="get otp"
                />
                <View style={[styles.textWrapper]}>
                    <Text variant="titleSmall" style={{ ...textAlign('center'), lineHeight: DefaultStyles.DefaultPadding + 10 }}>
                        Don't have an account?
                    </Text>
                    <TouchableRipple style={{ marginLeft: DefaultStyles.DefaultPadding - 10 }}>
                        <Text
                            variant="titleMedium"
                            style={{ color: colors.primary }}
                        >
                            Sign up
                        </Text>
                    </TouchableRipple>
                </View>
            </View>
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: DefaultStyles.DefaultPadding,
        paddingVertical: DefaultStyles.DefaultPadding,
        marginBottom: DefaultStyles.DefaultPadding + 60,
    },
    textWrapper: {
        marginVertical: DefaultStyles.DefaultPadding,
        flexDirection: 'row',
        flexWrap: 'wrap',
        ...centerBoth(),
    },
    input: {
        height: DefaultStyles.DefaultInputHeight,
        fontFamily: FontGilroy.Regular,
        fontWeight: '500',
    },
    footer: {
    },
});

export default Form;
