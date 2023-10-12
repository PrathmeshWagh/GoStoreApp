import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

import { useTheme, useDimensions } from '@hooks/index';
import { DefaultStyles } from '@primitives/index';
import { textAlign } from '@helpers/index';
import { FastImages } from '@atoms/index';

export const buyingGuideFeatures = [
	{
		src: 'https://gostor.com/images/stores/expert-assisted-buying/expert-demonstrations.webp',
		title: 'Expert Demonstrations',
		desc: 'Customers can initiate a live video call with an expert through GoStor website or app. The expert can demonstrate the features and functionalities of products in real-time.'
	},
	{
		src: 'https://gostor.com/images/stores/expert-assisted-buying/personalized-recommendations.webp',
		title: 'Personalized Recommendations',
		desc: 'Based on the customer’s needs, preferences, and budget, the expert can provide personalized recommendations. This ensures that the customer chooses products that align with their requirements.'
	},
	{
		src: 'https://gostor.com/images/stores/expert-assisted-buying/enhanced-shopping-experience.webp',
		title: 'Enhanced Shopping Experience',
		desc: 'Expert Assisted Buying enhances the overall shopping experience by providing a level of service that goes beyond what’s typically available online. It brings the advantages of in-person shopping to the convenience of online platforms.'
	},
];

const Guide = () => {
    const { colors } = useTheme();
    const { height } = useDimensions();

    return (
        <View style={{ paddingHorizontal: DefaultStyles.DefaultPadding, backgroundColor: colors.white, paddingVertical: DefaultStyles.DefaultPadding + 16 }}>
            {buyingGuideFeatures.map((feature, index) => (
                <View
                    key={index}
                    style={{ marginBottom: DefaultStyles.DefaultPadding + 30 }}
                >
                    <View style={{ height: height / 3 }}>
                        <FastImages
                            url={feature.src}
                            style={[styles.image]}
                            mode="cover"
                        />
                    </View>
                    <Text
                        variant="titleLarge"
                        style={{ ...textAlign('center'), marginTop: DefaultStyles.DefaultPadding - 6, marginBottom: DefaultStyles.DefaultPadding - 8 }}
                    >
                        {feature.title}
                    </Text>
                    <Text
                        variant="titleMedium"
                        style={{ ...textAlign('center') }}
                    >
                        {feature.desc}
                    </Text>
                </View>
            ))}
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
        borderRadius: DefaultStyles.DefaultRadius,
	},
});

export default Guide;
