import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import React from 'react';
import { DefaultStyles, FontGilroy } from '@primitives/index';
import { useTheme } from '@hooks/index';
import { useDimensions, usePermissionHandlers } from '@hooks/index';
import useStoresHook from 'hooks/useStores.hook';

const buyingGuideFeatures = [
	{
		src: require('@assets/images/expert-assisted-buying/expert-demonstrations.webp'),
		title: 'Expert Demonstrations',
		desc: `Customers can initiate a live video call with an expert through GoStor website or app. The expert can demonstrate the features and functionalities of products in real-time.`
	},
	{
		src: require('@assets/images/expert-assisted-buying/personalized-recommendations.webp'),
		title: 'Personalized Recommendations',
		desc: `Based on the customer’s needs, preferences, and budget, the expert can provide personalized recommendations. This ensures that the customer chooses products that align with their requirements.`
	},
	{
		src: require('@assets/images/expert-assisted-buying/enhanced-shopping-experience.webp'),
		title: 'Enhanced Shopping Experience',
		desc: `Expert Assisted Buying enhances the overall shopping experience by providing a level of service that goes beyond what’s typically available online. It brings the advantages of in-person shopping to the convenience of online platforms.`
	}
];

export default function StoreScreen() {
	const { colors } = useTheme();
	const { width, height } = useDimensions();

	const { stores, isLoading } = useStoresHook();
	console.log('store', stores);

	if (stores?.length === 0) {
		console.log('No store data');
		return null;
	}

	return (
		<ScrollView>
			<View style={styles.container}>
				<View style={styles.content}>
					<Text style={styles.title}>Welcome to GoStor Expert Assisted Buying</Text>
					<Text style={styles.description}>
						Connect with a knowledgeable electronics expert via live video call. Experience a
						personalized, in-depth product demo from the nearest electronics store, all from the
						comfort of your home.
					</Text>
				</View>
				<Image
					source={require('@assets/images/expert-assisted-buying/elevate-shopping-experience.webp')}
					style={{ width: width, height: height / 3 }}
				/>

				<View style={styles.content}>
					<Text style={styles.title}>Elevate your shopping experience</Text>
					<Text style={styles.description}>
						Unveil the power of informed decisions before purchase, as a virtual hands-on experience
						becomes just a click away.
					</Text>
				</View>
				<View>
					{buyingGuideFeatures.map((feature, index) => (
						<View key={index}>
							<View style={styles.content}>
								<Image
									source={feature.src}
									style={{ width: '100%', height: height / 3 }}
									resizeMode="contain"
								/>
								<Text style={styles.title}>{feature.title}</Text>
								<Text style={styles.description}>{feature.desc}</Text>
							</View>
							<View style={{ paddingHorizontal: 20, alignItems: 'center' }}></View>
						</View>
					))}
					<View style={{ paddingHorizontal: 20, alignItems: 'center' }}>
						<Image
							source={require('@assets/images/store-banner-mobile.png')}
							style={{ width: '100%', height: height / 3 }}
							resizeMode="contain"
						/>
					</View>
				</View>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	content: {
		flex: 1,
		padding: 16,
		justifyContent: 'center',
		alignItems: 'center'
	},
	title: {
		fontSize: 20,
		textAlign: 'center',
		paddingBottom: 20,
		fontFamily: FontGilroy.Bold
	},
	description: {
		fontSize: 15,
		textAlign: 'center',
		fontFamily: FontGilroy.Medium
	}
});
