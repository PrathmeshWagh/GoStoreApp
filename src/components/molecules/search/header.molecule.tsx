/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect, useCallback, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Text } from 'react-native-paper';

import { ButtonWrapper } from '@atoms/index';
import { BackIcon, CloseIcon, SearchIcon } from '@icons/index';
import { useEnhancedNavigation, useTheme } from '@hooks/index';
import { container, debounce, flexCenter, itemsBetween } from '@helpers/index';
import { DefaultStyles } from 'primitives';
import { useSearchContext } from '@context/search.context';
import { useSearch } from 'api/search/search.api';

const HeaderSearch = () => {
    const { pop } = useEnhancedNavigation();
    const { colors } = useTheme();
    const inputRef = useRef<any>(null);
    const { setSearchValue, searchValue } = useSearchContext();
    const { refetch } = useSearch();
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    const placeholderOptions = ["televisions", "tvs", "your options here",];

    useEffect(() => {
        inputRef.current && inputRef.current.focus();

        const intervalId = setInterval(updatePlaceholder, 1500);
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const updatePlaceholder = () => {
        setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholderOptions.length);
    };

    const handleSearch = () => {
        refetch();
    };

    const optimizedFn = useCallback(debounce(handleSearch), []);

	return (
		<View style={[styles.container]}>
            <ButtonWrapper
                onPress={() => pop()}
                styles={{ paddingHorizontal: DefaultStyles.DefaultPadding - 12 }}
            >
                <BackIcon size={32}/>
            </ButtonWrapper>
            <View style={{ ...container(), marginRight: DefaultStyles.DefaultPadding }}>
                <TextInput
                    value={searchValue}
                    onChangeText={(val) =>{
                        const lowercaseText = val.toLowerCase();
                        setSearchValue(lowercaseText);
                        optimizedFn(lowercaseText);
                    }}
                    ref={inputRef}
                    label=""
                    placeholder=""
                    mode="outlined"
                    outlineStyle={{ borderRadius: DefaultStyles.DefaultRadius * 10 }}
                    style={{ height: DefaultStyles.DefaultHeight - 6 }}
                    left={<TextInput.Icon icon={() => <SearchIcon color={colors.primary}/>}/>}
                    right={searchValue.length > 0 && <TextInput.Icon icon={
                        () => 
                            <ButtonWrapper onPress={() => setSearchValue('')}>
                                <CloseIcon size={16} color={colors.black}/>
                            </ButtonWrapper>
                            }
                        />
                    }
                />
                {searchValue.length === 0 && (
                    <ButtonWrapper
                        styles={[styles.placeholderContainer]}
                        onPress={() => inputRef.current.focus()}
                    >
                        <>
                            <Text variant="titleMedium">
                                Search by
                            </Text>
                            <Text
                                variant="labelMedium"
                                style={[styles.dynamicText, { color: colors.primary }]}
                            >
                                {placeholderOptions[placeholderIndex]}
                            </Text>
                        </>
                    </ButtonWrapper>
                )}
            </View>
        </View>
	);
};

const styles = StyleSheet.create({
    container: {
        ...itemsBetween(),
        marginTop: DefaultStyles.DefaultPadding,
        paddingBottom: DefaultStyles.DefaultPadding,
    },
    input: {
        borderRadius: DefaultStyles.DefaultRadius * 10,
        height: DefaultStyles.DefaultHeight - 6,
    },
    placeholderContainer: {
        ...flexCenter(),
        position: 'absolute',
        top: 0,
        left: DefaultStyles.DefaultPadding + 42,
        bottom: 0,
    },
    dynamicText: {
        marginLeft: DefaultStyles.DefaultPadding - 10,
    },
});

export default HeaderSearch;
