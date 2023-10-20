import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Keyboard } from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { otpSchema } from '@helpers/validators.helpers';
import { DefaultStyles, FontGilroy } from '@primitives/index';
import { CustomButtom, CustomInput } from '@atoms/index';
import { centerBoth } from '@helpers/index';
import { useEnhancedNavigation } from '@hooks/index';
import { useLoginMutation } from '@api/auth/use-login';

const Form = () => {
    const inputRef = useRef<any>(null);
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(otpSchema),
    });
    const { mutate: login, isLoading } = useLoginMutation();
    const { router } = useEnhancedNavigation();

    useEffect(() => {
        inputRef.current && inputRef.current.focus();
    }, []);

    const onSubmit = (values: { otp: string }) => {
        const { otp } = values;
        Keyboard.dismiss();
        login({
            mobile: router?.params?.mobileNumber,
            otp: otp,
            isNewUser: false,
        });
    };

    return (
        <View style={[ styles.container ]}>
            <CustomInput
                ref={inputRef}
                control={control}
                name="otp"
                label="Enter your otp"
                placeholder="Ex:123456"
                keyboardType="number-pad"
                errorMessage={errors.otp?.message}
                maxLength={6}
            />
            <View style={[ styles.footer ]}>
                <CustomButtom
                    mode="elevated"
                    onPress={handleSubmit(onSubmit)}
                    uppercase
                    loading={isLoading}
                    disabled={isLoading}
                    text="get otp"
                />
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
        marginVertical: DefaultStyles.DefaultPadding,
    },
});

export default Form;
