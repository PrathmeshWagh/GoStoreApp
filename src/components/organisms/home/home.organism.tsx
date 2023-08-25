import React from 'react';
import { FlatList } from 'react-native';

import Categories from '@molecules/home/categories.molecule';
import { useParentBanner } from '@api/banners/use-parent-banner-struture.api';
import { ErrorStatus, Indicator } from '@atoms/index';
import HomeSection from '@molecules/home/home-section.molecule';

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
            bannerData.forEach((banner) => {
                if (banner?.bannerName === 'HOMEPAGE_PRIMARY_BANNER') {
                    results.push({
                        id: banner.parentBannerId.toString(),
                        component: HomeSection,
                        props: { banner },
                    });
                }
            });
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
