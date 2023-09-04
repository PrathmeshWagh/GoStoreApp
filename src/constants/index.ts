import { FontGilroy } from '@primitives/index';

export const BaseFont = {
    fontFamily: FontGilroy.Regular,
} as const;

export const CustomFontVariants = {
	labelSmall: {
		fontFamily: FontGilroy.SemiBold,
		fontWeight: '600',
		fontSize: 12,
		letterSpacing: 0,
		lineHeight: 28,
	},
    labelMedium: {
		fontFamily: FontGilroy.SemiBold,
		fontWeight: '600',
		fontSize: 14,
		letterSpacing: 0,
		lineHeight: 28,
	},
	labelLarge: {
		fontFamily: FontGilroy.SemiBold,
		fontWeight: '600',
		fontSize: 16,
		letterSpacing: 0,
		lineHeight: 28,
	},
	titleSmall: {
		fontFamily: FontGilroy.Regular,
		fontWeight: '300',
		fontSize: 12,
		letterSpacing: 0,
		lineHeight: 28,
	},
    titleMedium: {
		fontFamily: FontGilroy.Regular,
		fontWeight: '400',
		fontSize: 14,
		letterSpacing: 0,
		lineHeight: 28,
	},
	titleLarge: {
		fontFamily: FontGilroy.Regular,
		fontWeight: '500',
		fontSize: 16,
		letterSpacing: 0,
		lineHeight: 28,
	},
} as const;

export const CustomColors = {
	primary: '#3a9545',
	secondary: '#000000',
	onSecondary: '#FFFFFF',
	error: '#B03A2E',
	onError: '#FFFFFF',
	tertiary: '#D7DBDD',
};
