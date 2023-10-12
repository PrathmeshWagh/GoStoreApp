import React, { forwardRef } from 'react';
import { TextInput, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { Controller } from 'react-hook-form';

import { useTheme } from '@hooks/index';
import { DefaultStyles, FontGilroy } from '@primitives/index';

interface CustomTextInputProps {
    control: any;
    name: string;
    label: string;
    placeholder: string;
    keyboardType?: 'default' | 'numeric' | 'email-address' | 'ascii-capable' | 'numbers-and-punctuation' | 'url' | 'number-pad' | 'phone-pad' | 'name-phone-pad' | 'decimal-pad' | 'twitter' | 'web-search' | 'visible-password';
    maxLength?: number;
    errorMessage?: string | null | any;
    containerStyles?: any;
    ref?: React.Ref<any>;
    editable?: boolean
}

const CustomTextInput = forwardRef<any, CustomTextInputProps>(({
    control,
    name,
    label,
    placeholder,
    keyboardType = 'default',
    maxLength,
    errorMessage,
    containerStyles,
    editable = true,
}, ref) => {
    const { colors } = useTheme();

    return (
        <View style={[containerStyles]}>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <TextInput
                            ref={ref}
                            label={label}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            maxLength={maxLength}
                            value={value}
                            mode="outlined"
                            placeholder={placeholder}
                            keyboardType={keyboardType}
                            style={[styles.input, !editable ? { backgroundColor: colors.grey } : {} ]}
                            error={!!errorMessage}
                            editable={editable}
                        />
                        {
                            errorMessage &&
                            <Text
                                style={[styles.errorText, { color: colors.error }]}
                                variant="titleSmall"
                            >
                                {errorMessage}
                            </Text>
                        }
                    </>
                )}
            />
        </View>
    );
});

const styles = StyleSheet.create({
    input: {
        height: DefaultStyles.DefaultInputHeight,
        fontFamily: FontGilroy.Regular,
        fontWeight: '500',
    },
    errorText: {
        fontWeight: '500',
    },
});

export default CustomTextInput;