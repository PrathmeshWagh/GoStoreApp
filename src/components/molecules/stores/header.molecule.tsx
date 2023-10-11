import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

import { useTheme, useDimensions } from '@hooks/index';
import { DefaultStyles } from '@primitives/index';
import { textAlign } from '@helpers/index';
import { FastImages } from '@atoms/index';

const Header = () => {
    const { colors } = useTheme();
    const { width, height } = useDimensions();

    return (
        <View>
            <View style={{ paddingHorizontal: DefaultStyles.DefaultPadding, backgroundColor: colors.greyBg, paddingVertical: DefaultStyles.DefaultPadding + 16 }}>
                <Text
                    variant="labelLarge"
                    style={{ ...textAlign('center') }}
                >
                    Welcome to GoStor Expert Assisted Buying
                </Text>
                <Text
                    variant="titleMedium"
                    style={{
                        lineHeight: DefaultStyles.DefaultPadding,
                        marginTop: DefaultStyles.DefaultPadding + 16,
                        ...textAlign('center'),
                    }}
                >
                    Connect with a knowledgeable electronics expert via live video call. Experience a
                    personalized, in-depth product demo from the nearest electronics store, all from the
                    comfort of your home.
                </Text>
            </View>
            <View style={{ width: width, height: height / 3 }}>
                <FastImages
                    url={'https://gostor.com/images/stores/expert-assisted-buying/elevate-shopping-experience.webp'}
                    style={[styles.image]}
                    mode="cover"
                />
            </View>
            <View style={{ paddingHorizontal: DefaultStyles.DefaultPadding, paddingVertical: DefaultStyles.DefaultPadding + 16, backgroundColor: colors.white }}>
                <Text
                    variant="labelLarge"
                    style={{ ...textAlign('center'), marginBottom: DefaultStyles.DefaultPadding }}
                >
                    Elevate your shopping experience
                </Text>
                <Text
                    variant="titleMedium"
                    style={{ ...textAlign('center') }}
                >
                    Unveil the power of informed decisions before purchase, as a virtual hands-on experience
                    becomes just a click away.
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alighItems: 'center',
        justifyContent: 'center',
    },
    image: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
});

export default Header;
