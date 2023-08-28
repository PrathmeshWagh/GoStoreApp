import React from 'react';
import { FlatList } from 'react-native';

import Categories from '@molecules/home/categories.molecule';
import { useParentBanner } from '@api/banners/use-parent-banner-struture.api';
import { ErrorStatus, Indicator } from '@atoms/index';
import BannerImagesSection from '@molecules/home/banner-images-section.molecule';
import { useDimensions } from '@hooks/index';
import { DefaultStyles } from '@primitives/index';

type ComponentListItem = {
    id: string;
    component: React.ComponentType<any>;
    props?: any;
};

const Home = () => {
    // const location = useSelector((state: RootState) => state.location);
    // const dispatch = useDispatch();
    // console.log(dispatch, location);
    const { data, isLoading, isError, refetch } = useParentBanner();
    const bannerData = data?.data || [];
    const { width } = useDimensions();

    //create a banner mapping of different banners and pass the props
    const bannerComponentMapping: Record<string, (banner: typeof bannerData[0]) => { component: React.ComponentType<any>, props: any }> = {
        'HOMEPAGE_PRIMARY_BANNER': (banner) => ({
            component: BannerImagesSection,
            props: { banner, itemWidth: Math.round(width * 0.92) + 5, imgHeight: 0.4 },
        }),
        'STRIP_BANNER_1': (banner) => ({
            component: BannerImagesSection,
            props: { banner, itemWidth: Math.round(width * 0.92) + 5, imgHeight: 0.16, textStyles: { paddingHorizontal: DefaultStyles.DefaultPadding, marginTop: DefaultStyles.DefaultPadding + 10, marginBottom: DefaultStyles.DefaultPadding - 10 } },
        }),
        'OFFER_BANNER_1_2': (banner) => ({
            component: BannerImagesSection,
            props: { banner, itemWidth: Math.round(width * 0.92) + 5, imgHeight: 1, textStyles: { paddingHorizontal: DefaultStyles.DefaultPadding, marginTop: DefaultStyles.DefaultPadding + 10, marginBottom: DefaultStyles.DefaultPadding - 10 } },
        }),
    };

    //return the data from banner
    const getComponentInfoForBanner = (banner: typeof bannerData[0]) => {
        const mapFunction = bannerComponentMapping[banner?.bannerName];
        if (mapFunction) {
            return {
                id: banner.parentBannerId.toString(),
                ...mapFunction(banner),
            };
        }
        return null;
    };

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

    const componentList: ComponentListItem[] = [
        { id: '1', component: Categories },
        ...bannersComponentList(),
    ];

    return (
        <FlatList
            data={componentList}
            renderItem={({ item }) => {
                const Component = item.component;
                return <Component {...item.props} />;
            }}
            keyExtractor={ item => item.id }
        />
    );
};

export default Home;
