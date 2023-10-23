import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import Config from 'react-native-config';

import { AboutIcon, FaqIcon, OrdersIcon, ProfileIcon, ReferalIcon, SupportIcon } from '@icons/index';
import { ButtonWrapper } from '@atoms/index';
import { centerVertical, flexDirection } from '@helpers/index';
import { DefaultStyles } from '@primitives/index';
import { useEnhancedNavigation, useTheme } from '@hooks/index';
import { RootState } from '@slices/store';
import { updateUrl } from '@slices/webview.slice';
import { RouteConstants } from '@routes/constants.routes';

const Item = () => {
	const { colors } = useTheme();
	const auth = useSelector((state: RootState) => state.auth);
	const { navigate } = useEnhancedNavigation();
	const dispatch = useDispatch();

	const handleWebview = (url: string) => {
		navigate(RouteConstants.MainWebviewScreenRoute);
		dispatch(updateUrl({ url: `${Config.BASE_WEBVIEW_URL}/${url}` }));
	};

	const items = [
		...(auth.loggedIn
			?
			[
				{
					id: 1,
					img: <ProfileIcon size={32} />,
					text: 'My Profile',
					webview: true,
					onPress: () => null,
				},
				{
					id: 2,
					img: <OrdersIcon size={32} />,
					text: 'My Orders',
					webview: true,
					onPress: () => null,
				},
			]
			:
			[
				{
					id: 1,
					img: <ProfileIcon size={32} />,
					text: 'Login',
					webview: false,
					onPress: () => null,
				},
			]),
		{
			id: 3, img: <ReferalIcon size={32}/>, text: 'Referal', webview: true, onPress: () => handleWebview('referral'),
		},
		{
			id: 4, img: <AboutIcon size={32}/>, text: 'About Us', webview: true, onPress: () => handleWebview('about-us'),
		},
		{
			id: 5, img: <SupportIcon size={32}/>, text: 'Customer Support', webview: true, onPress: () => handleWebview('customer-support'),
		},
		{
			id: 6, img: <FaqIcon size={32}/>, text: 'FAQs', webview: true, onPress: () => handleWebview('faqs'),
		},
		{
			id: 7, img: <ProfileIcon size={32}/>, text: 'Terms and Conditions', webview: true, onPress: () => handleWebview('terms-and-conditions'),
		},
		{
			id: 8, img: <ProfileIcon size={32}/>, text: 'Privacy Policy', webview: true, onPress: () => handleWebview('privacy-policy'),
		},
		{
			id: 9, img: <ReferalIcon size={32}/>, text: 'Cancellation and Refunds', webview: true, onPress: () => handleWebview('cancellation-and-return-policy'),
		},
	];

	return (
		<View>
            {
				items.map((item) => {
					return (
						<ButtonWrapper
							key={item.id}
							onPress={item.onPress}
							styles={[styles.button, { borderBottomColor: colors.borderDarkColor1 }]}
						>
							<View style={[{ ...flexDirection('row'), ...centerVertical(), paddingVertical: DefaultStyles.DefaultPadding - 4 }]}>
								{ item.img }
								<Text
									variant="titleMedium"
									style={[{ marginLeft: DefaultStyles.DefaultPadding }]}
								>
									{ item.text }
								</Text>
							</View>
						</ButtonWrapper>
					);
				})
			}
		</View>
	);
};

const styles = StyleSheet.create({
	button: {
		paddingHorizontal: DefaultStyles.DefaultPadding - 4,
		borderBottomWidth: 1,
	},
});

export default Item;
