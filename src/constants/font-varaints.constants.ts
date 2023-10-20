import { FontGilroy } from '@primitives/index';

export const BaseFont = {
    fontFamily: FontGilroy.Regular,
} as const;

export const CustomFontVariants = {
	headlineSmall: {
		fontFamily: FontGilroy.SemiBold,
		fontWeight: '600',
		fontSize: 16,
		letterSpacing: 0,
	},
    headlineMedium: {
		fontFamily: FontGilroy.SemiBold,
		fontWeight: '600',
		fontSize: 24,
		letterSpacing: 0,
	},
	headlineLarge: {
		fontFamily: FontGilroy.SemiBold,
		fontWeight: '600',
		fontSize: 32,
		letterSpacing: 0,
	},
	labelSmall: {
		fontFamily: FontGilroy.SemiBold,
		fontWeight: '600',
		fontSize: 12,
		letterSpacing: 0,
	},
    labelMedium: {
		fontFamily: FontGilroy.SemiBold,
		fontWeight: '600',
		fontSize: 14,
		letterSpacing: 0,
	},
	labelLarge: {
		fontFamily: FontGilroy.SemiBold,
		fontWeight: '600',
		fontSize: 16,
		letterSpacing: 0,
	},
	titleSmall: {
		fontFamily: FontGilroy.Regular,
		fontWeight: '300',
		fontSize: 12,
		letterSpacing: 0,
	},
    titleMedium: {
		fontFamily: FontGilroy.Regular,
		fontWeight: '400',
		fontSize: 14,
		lineHeight: 18,
	},
	titleLarge: {
		fontFamily: FontGilroy.Regular,
		fontWeight: '500',
		fontSize: 16,
		letterSpacing: 0,
	},
} as const;
