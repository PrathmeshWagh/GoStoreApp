import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

import { ButtonWrapper } from '@atoms/index';
import { SearchIcon } from '@icons/index';
import { DefaultStyles } from '@primitives/index';
import { borderBottom, centerVertical, flexDirection } from '@helpers/index';
import { useTheme } from '@hooks/index';
import { useSearchContext } from '@context/search.context';

const Item = ({ item }: { item: CustomTypes.SearchData }) => {
    const { colors } = useTheme();
    const { searchValue } = useSearchContext();
    const textParts = item.text.toLowerCase().split(new RegExp(`(${searchValue.toLowerCase()})`, 'g'));

    return (
        <ButtonWrapper
            styles={{ ...borderBottom({ width: 1, color: colors.lightGrey }) }}
            onPress={() => null}
        >
            <View style={[{ paddingHorizontal: DefaultStyles.DefaultPadding + 10, ...flexDirection('row'), ...centerVertical(), paddingVertical: DefaultStyles.DefaultPadding }]}>
                <View>
                    <SearchIcon size={18} color={colors.grey}/>
                </View>
                <View style={{
                    marginLeft: DefaultStyles.DefaultPadding - 4,
                    ...flexDirection('row'),
                    ...centerVertical(),
                }}>
                     {textParts.map((part, index) => (
                        part.toLowerCase() === searchValue.toLowerCase() ? (
                            <Text key={index} variant="titleMedium">
                                {part}
                            </Text>
                        ) : (
                            <Text key={index} variant="labelMedium">
                                {part}
                            </Text>
                        )
                    ))}
                </View>
            </View>
        </ButtonWrapper>
    );
};

export default Item;
