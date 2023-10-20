import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

import { DefaultStyles } from '@primitives/index';
import { useTrending } from '@api/search/trending.api';
import { useSearchContext } from '@context/search.context';
import { border1 } from '@helpers/index';
import { useTheme } from '@hooks/index';

const Trending = () => {
    const { data } = useTrending();
    const { searchValue } = useSearchContext();
    const { colors } = useTheme();

    if (searchValue.length <= 0) {
        return (
            <View style={{ paddingHorizontal: DefaultStyles.DefaultPadding }}>
                <Text variant="headlineSmall">
                    Trending Searches
                </Text>
                <View style={[styles.wrapper]}>
                    {
                        data?.data?.map((trendingValue) => {
                            return (
                                <View
                                    key={trendingValue.search}
                                    style={[styles.item, { ...border1({ width: 1, color: colors.grey, radius: 100 }) }]}
                                >
                                    <Text variant="titleMedium">
                                        { trendingValue.search }
                                    </Text>
                                </View>
                            );
                        })
                    }
                </View>
            </View>
        );
    }

    return null;
};

const styles = StyleSheet.create({
    wrapper: {
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    item: {
        paddingHorizontal: DefaultStyles.DefaultPadding - 8,
        paddingVertical: DefaultStyles.DefaultPadding - 10,
        marginVertical: DefaultStyles.DefaultPadding - 10,
        marginHorizontal: DefaultStyles.DefaultPadding - 12,
    },
});

export default Trending;

