import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useEnhancedNavigation, useTheme } from '@hooks/index';
import { ButtonWrapper } from 'components/atoms';
import { Text } from 'react-native-paper';
import { SearchIcon } from '@icons/index';
import { centerBoth, container, itemsBetween } from '@helpers/index';
import { DefaultStyles } from '@primitives/index';
import { RouteConstants } from '@routes/constants.routes';

const Search = () => {
	const { colors } = useTheme();
    const { navigate } = useEnhancedNavigation();

    return (
        <View style={[styles.container, { borderBottomColor: colors.lightGrey, backgroundColor: colors.primary }]}>
            <ButtonWrapper
                styles={[{ backgroundColor: colors.white }, styles.searchWrapper]}
                onPress={() => navigate(RouteConstants.SearchScreenRoute)}
            >
                <Text variant="titleMedium" style={{ color: colors.grey, paddingLeft: DefaultStyles.DefaultPadding + 8 }}>
                    Search for products & brands
                </Text>
            </ButtonWrapper>
            <ButtonWrapper
                styles={[styles.searchButton, { backgroundColor: colors.white }]}
                onPress={() => navigate(RouteConstants.SearchScreenRoute)}
            >
                <SearchIcon color={colors.primary}/>
            </ButtonWrapper>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...itemsBetween(),
        borderBottomWidth: 1,
        paddingVertical: DefaultStyles.DefaultPadding - 4,
        paddingHorizontal: DefaultStyles.DefaultPadding - 4,
    },
    searchWrapper: {
        ...container(),
        height: DefaultStyles.DefaultHeight - 10,
        marginRight: DefaultStyles.DefaultPadding - 4,
        borderRadius: DefaultStyles.DefaultRadius * 10,
        justifyContent: 'center',
    },
    searchButton: {
        width: DefaultStyles.DefaultHeight - 12,
        height: DefaultStyles.DefaultHeight - 12,
        borderRadius: DefaultStyles.DefaultRadius * 10,
        ...centerBoth(),
    },
});

export default Search;

