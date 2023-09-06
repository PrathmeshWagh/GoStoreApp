import React from 'react';
import { View, StyleSheet } from 'react-native';

import { CustomButtom } from '@atoms/index';
import { DefaultStyles } from 'primitives';
interface FooterProps {
    onPress: () => void;
    footer: {
        btnText: string;
    }
}

const Footer = (props: FooterProps) => {
    const { onPress, footer } = props;

    return (
        <View style={[styles.container]}>
            <CustomButtom
                onPress={onPress}
                loading={false}
                disabled={false}
                text={footer.btnText}
                textStyles={[styles.textStyles]}
                styles={[styles.btnStyles]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: DefaultStyles.DefaultPadding + 8,
    },
    textStyles: {
        letterSpacing: 1,
    },
    btnStyles: {
        borderRadius: DefaultStyles.DefaultPadding * 4,
        paddingHorizontal: DefaultStyles.DefaultPadding * 2,
    },
});

export default Footer;
