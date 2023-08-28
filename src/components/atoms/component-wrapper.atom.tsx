// use this only when component is api fetching
// shows loader and when something goes wrong

import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';

import { useTheme } from '@hooks/index';
import { DefaultStyles, FontGilroy } from '@primitives/index';
import CustomButtom from './button.atom';

interface ComponentWrapperProps {
    loading: boolean;
    error: boolean;
    children: ReactNode;
    loadingText?: string;
    textStyles?: ViewStyle;
    errText?:String;
    refetch?: () => void;
}

const ComponentWrapper = (props: ComponentWrapperProps) => {
    const { loading, error, children, loadingText = 'Fetching...', errText = 'Unable to fetch', textStyles, refetch } = props;
    const { colors } = useTheme();

    if (loading) {
        return (
            <View style={[styles.container]}>
                <ActivityIndicator
                    animating={true}
                    color={colors.primary}
                />
                <Text
                    style={[ textStyles, styles.textStyle ]}
                    variant="titleSmall"
                >
                    { loadingText }
                </Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={[styles.container]}>
                <Text
                    style={[ textStyles, styles.textStyle ]}
                    variant="titleSmall"
                >
                    { errText }
                </Text>
                {
                    refetch &&
                        <CustomButtom
                            onPress={refetch}
                            loading={false}
                            disabled={false}
                            mode="outlined"
                            text="Retry"
                            styles={[styles.btnStyles]}
                            textStyles={[{ color: colors.secondary }, styles.textStyle]}
                            varaint="titleSmall"
                        />
                }
            </View>
        );
    }

    return (
        <>
            { children }
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 12,
        alignItems: 'center',
    },
    textStyle: {
        marginTop: 8,
        fontFamily: FontGilroy.Light,
    },
    btnStyles: {
        height: DefaultStyles.DefaultButtonHeight - 10,
        borderRadius: DefaultStyles.DefaultButtonHeight,
        marginTop: 4,
    },
});

export default ComponentWrapper;
