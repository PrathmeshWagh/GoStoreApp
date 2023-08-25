import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { useTheme } from '@hooks/index';
import { DefaultStyles, FontGilroy } from '@primitives/index';

interface ErrorStatusProps {
    errorText: string;
    btnText: string;
    refetch: () => void;
}

const ErrorStatus = (props: ErrorStatusProps) => {
    const { colors } = useTheme();
    const { errorText, btnText, refetch } = props;

    return (
        <View style={[styles.container]}>
            <Text
                style={[ styles.textStyle ]}
                variant="titleSmall"
            >
                { errorText }
            </Text>
            {
                btnText !== '' &&
                    <Button
                        mode="outlined"
                        uppercase
                        textColor={colors.secondary}
                        labelStyle={{ fontSize: DefaultStyles.DefaultFontSize - 2 }}
                        style={[styles.btnStyles, { borderColor: colors.secondary }]}
                        onPress={refetch}
                    >
                        retry
                    </Button>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: DefaultStyles.DefaultPadding * 2,
        marginHorizontal: DefaultStyles.DefaultPadding,
        alignItems: 'center',
    },
    textStyle: {
        marginTop: 8,
        fontFamily: FontGilroy.Light,
    },
    btnStyles: {
        height: DefaultStyles.DefaultButtonHeight - 10,
        marginTop: 8,
    },
});

export default ErrorStatus;
