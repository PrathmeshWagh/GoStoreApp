import { useDispatch, useSelector } from 'react-redux';
import Config from 'react-native-config';

import { useEnhancedNavigation } from '@hooks/index';
import { AppDispatch, RootState } from '@slices/store';
import { updateUrl } from 'slices/webview.slice';
import { RouteConstants } from '@routes/constants.routes';
import {
	fetchTaggedBannerProducts,
	fetchTaggedBannerData
} from '@api/banners/use-banner-tagged-products.api';
import { closeModal, openModal } from '@slices/modal.slice';

const useBannerClick = () => {
	const { navigate } = useEnhancedNavigation();
	const dispatch = useDispatch<AppDispatch>();
	const location = useSelector((state: RootState) => state.location);

	const typeProduct = async (banner: BannerData) => {
		dispatch(
			openModal({
				view: 'loading',
				title: 'Redirecting...'
			})
		);
		let productIds = [];
		try {
			const { data } = await fetchTaggedBannerProducts({
				bannerId: banner.childBannerId,
				clusterId: location.cluster_id,
				state: location.state
			});
			if (data?.status === 'success') {
				productIds = data.data.map((eachItem: any) => {
					return eachItem.productId;
				});
				const url = `/banner-products?productIds=${productIds.join(',')}&sort_by=price_desc`;
				dispatch(updateUrl({ url: `${Config.BASE_WEBVIEW_URL}${url}` }));
				navigate(RouteConstants.MainWebviewScreenRoute);
				dispatch(closeModal());
			} else {
				dispatch(closeModal());
			}
		} catch (err) {
			dispatch(closeModal());
		}
	};

	const typeDefault = async (banner: BannerData, bannerType: BannerType) => {
		dispatch(
			openModal({
				view: 'loading',
				title: 'Redirecting...'
			})
		);
		try {
			const { data } = await fetchTaggedBannerData({
				bannerType: bannerType,
				tagType: banner.tagType,
				bannerId: banner.childBannerId,
				clusterId: location.cluster_id,
				state: location.state
			});
			if (data?.status === 'success') {
				if (data.data[0].tagType === 'BRAND') {
					const url = `/brand/${data?.data[0]?.brand}?sort_by=recommendation_asc`;
					dispatch(updateUrl({ url: `${Config.BASE_WEBVIEW_URL}${url}` }));
					navigate(RouteConstants.MainWebviewScreenRoute);
					dispatch(closeModal());
				}
			} else {
				dispatch(closeModal());
			}
		} catch (err) {
			dispatch(closeModal());
		}
	};

	const typeLink = (banner: BannerData) => {
		dispatch(
			openModal({
				view: 'loading',
				title: 'Redirecting...'
			})
		);
		dispatch(updateUrl({ url: `${banner?.bannerLink}` }));
		navigate(RouteConstants.MainWebviewScreenRoute);
		dispatch(closeModal());
	};

	const bannerClick = (banner: BannerData, bannerType: BannerType) => {
		console.log(banner);

		switch (banner.tagType) {
			case 'PRODUCT':
				typeProduct(banner);
				break;
			case 'LINK':
				typeLink(banner);
				break;
			default:
				typeDefault(banner, bannerType);
				break;
		}
	};

	return {
		bannerClick
	};
};

export default useBannerClick;
