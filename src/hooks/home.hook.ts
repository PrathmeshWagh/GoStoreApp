import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';

import Categories from '@molecules/home/categories.molecule';
import { ErrorStatus, Indicator } from '@atoms/index';
import BannerImagesSection from '@molecules/home/banner-images-section.molecule';
import { DefaultStyles } from '@primitives/index';
import ColumnsSection from '@molecules/home/columns-section.molecule';
import ProductListSection from '@molecules/home/product-list-section.molecule';
import VideoPlayer from '@molecules/home/video.molecule';
import useDimensions from './dimensions.hook';
import { useParentBanner } from '@api/banners/use-parent-banner-struture.api';
import BannerImagesFlatlistSection from '@molecules/home/banner-images-flatlist.molecule';
import Search from '@molecules/home/search.molecule';

type ComponentListItem = {
	id: string;
	component: React.ComponentType<any>;
	props?: any;
};

const useHome = () => {
	const { width, viewportWidth } = useDimensions();
	const { data, isLoading, isError, refetch } = useParentBanner();
	const bannerData = data?.data || [];

	const navigation = useNavigation();
	const [isFocused, setIsFocused] = useState(true);
	const [isVideoVisible, setIsVideoVisible] = useState(true); // state to determine if the video is visible in the FlatList
	const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }); // change the threshold based on your needs
	const trendingDeals = viewportWidth / 2.4;

	useEffect(() => {
		const unsubscribeFocus = navigation.addListener('focus', () => setIsFocused(true));
		const unsubscribeBlur = navigation.addListener('blur', () => setIsFocused(false));

		return () => {
			unsubscribeFocus();
			unsubscribeBlur();
		};
	}, [navigation]);

	const handleViewableItemsChanged = useCallback(({ viewableItems }: any) => {
		// check if the video item is visible
		const videoIsInView = viewableItems.some((item: any) => item.item.id === '2');
		setIsVideoVisible(videoIsInView);
	}, []);

	//create a banner mapping of different banners and pass the props
	const bannerComponentMapping: Record<
		string,
		(banner: (typeof bannerData)[0]) => { component: React.ComponentType<any>; props: any }
	> = {
		HOMEPAGE_PRIMARY_BANNER: (banner) => ({
			component: BannerImagesSection,
			props: {
				banner,
				itemWidth: Math.round(width * 0.92) + 5,
				imgHeight: 0.4,
			},
		}),
		STRIP_BANNER_1: (banner) => ({
			component: BannerImagesSection,
			props: {
				banner,
				itemWidth: Math.round(width * 0.92) + 5,
				imgHeight: 0.16,
				textStyles: {
					paddingHorizontal: DefaultStyles.DefaultPadding,
					marginTop: DefaultStyles.DefaultPadding + 10,
					marginBottom: DefaultStyles.DefaultPadding - 10,
				},
			},
		}),
		OFFER_BANNER_1_2: (banner) => ({
			component: BannerImagesSection,
			props: {
				banner,
				itemWidth: Math.round(width * 0.92) + 5,
				imgHeight: 1,
				textStyles: {
					paddingHorizontal: DefaultStyles.DefaultPadding,
					marginTop: DefaultStyles.DefaultPadding + 10,
					marginBottom: DefaultStyles.DefaultPadding - 10,
				},
			},
		}),
		TRENDING_DEALS: (banner) => ({
			component: BannerImagesFlatlistSection,
			props: {
				banner,
				itemWidth: trendingDeals,
				loop: false,
				imgHeight: 1.4,
				itemsToShow: 2.8,
				textStyles: {
					marginTop: DefaultStyles.DefaultPadding + 10,
				},
				containerStyles: {
					paddingHorizontal: DefaultStyles.DefaultPadding,
					marginTop: DefaultStyles.DefaultPadding,
				},
			},
		}),
		RECTANGLE_2_3: (banner) => ({
			component: ColumnsSection,
			props: {
				banner,
				imgHeight: Math.round(width * 0.4),
				columns: 3,
				containerStyles: {
					paddingHorizontal: DefaultStyles.DefaultPadding,
					marginTop: DefaultStyles.DefaultPadding,
				},
				textStyles: { marginBottom: DefaultStyles.DefaultPadding - 10 },
			},
		}),
		RECTANGLE_1_3: (banner) => ({
			component: ColumnsSection,
			props: {
				banner,
				imgHeight: Math.round(width * 0.4),
				columns: 3,
				containerStyles: {
					paddingHorizontal: DefaultStyles.DefaultPadding,
					marginTop: DefaultStyles.DefaultPadding,
				},
				textStyles: { marginBottom: DefaultStyles.DefaultPadding - 10 },
			},
		}),
		STANDARD_CARD_BANNER_2_2: (banner) => ({
			component: ColumnsSection,
			props: {
				banner,
				imgHeight: Math.round(width * 0.5),
				columns: 2,
				containerStyles: {
					paddingHorizontal: DefaultStyles.DefaultPadding,
					marginTop: DefaultStyles.DefaultPadding,
				},
				textStyles: { marginBottom: DefaultStyles.DefaultPadding - 10 },
			},
		}),
		CATEGORY_BANNER_1_2: (banner) => ({
			component: ColumnsSection,
			props: {
				banner,
				imgHeight: Math.round(width * 0.58),
				columns: 1,
				containerStyles: {
					paddingHorizontal: DefaultStyles.DefaultPadding,
					marginTop: DefaultStyles.DefaultPadding,
				},
				textStyles: { marginBottom: DefaultStyles.DefaultPadding - 10 },
			},
		}),
		PRODUCT_LISTING_BANNER: (banner) => ({
			component: ProductListSection,
			props: {
				banner,
				itemWidth: width - 60,
				imgHeight: Math.round(width * 0.5),
				containerStyles: {
					paddingHorizontal: DefaultStyles.DefaultPadding,
					marginTop: DefaultStyles.DefaultPadding,
				},
				textStyles: { marginBottom: DefaultStyles.DefaultPadding - 10 },
			},
		}),
	};

	//return the data from banner
	const getComponentInfoForBanner = (banner: (typeof bannerData)[0]) => {
		const mapFunction = bannerComponentMapping[banner?.bannerName];

		if (mapFunction) {
			return {
				id: banner.parentBannerId.toString(),
				...mapFunction(banner),
			};
		}
		return null;
	};

	//Creating ui layer
	const bannersComponentList = (): ComponentListItem[] => {
		const results: ComponentListItem[] = [];

		if (isLoading && !bannerData.length) {
			results.push({
				id: '40',
				component: Indicator,
			});
		} else if (isError && !bannerData.length) {
			results.push({
				id: '41',
				component: ErrorStatus,
				props: {
					errorText: 'Unable to fetch data.',
					btnText: 'retry',
					refetch: refetch,
				},
			});
		} else {
			for (const banner of bannerData) {
				const componentInfo = getComponentInfoForBanner(banner);
				if (componentInfo) {
					results.push(componentInfo);
				}
			}
		}
		return results;
	};

	//making the component
	const componentList: ComponentListItem[] = [
		{ id: '0', component: Search },
		{ id: '1', component: Categories },
		{ id: '2', component: VideoPlayer, props: { isPaused: !isFocused || !isVideoVisible } },
		...bannersComponentList(),
	];

	return {
		componentList,
		handleViewableItemsChanged,
		viewabilityConfig,
	};
};

export default useHome;
