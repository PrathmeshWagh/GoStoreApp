import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { SvgUri } from 'react-native-svg';

import { useTheme } from 'hooks';
import { DefaultStyles } from 'primitives';
import MenuIcon from '@assets/icons/menu.svg';
import BackIcon from '@assets/icons/back.svg';
import SearchIcon from '@assets/icons/search.svg';
import CartIcon from '@assets/icons/cart.svg';
import LocationIcon from '@assets/icons/location.svg';

interface HeaderProps {
    layout: LayoutType;
}

const Header = (props: HeaderProps) => {
    const { colors } = useTheme();
    const { layout } = props;

    return (
        <View style={[ styles.container, { backgroundColor: colors.primary, height: DefaultStyles.DefaultPadding * 3, paddingHorizontal: DefaultStyles.DefaultPadding }]}>
            <View style={[ styles.item ]}>
                <TouchableOpacity
                    onPress={() => console.log('Pressed')}
                    // style={[ styles.icon, { marginHorizontal: DefaultStyles.DefaultPadding * 0.38 } ]}
                >
                    {
                        layout.menu ?
                            null
                            // <MenuIcon
                            //     width={32}
                            //     height={32}
                            // />
                            :
                            <BackIcon
                                width={24}
                                height={24}
                            />
                    }
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => console.log('Pressed')}
                    style={[ styles.logo, { marginHorizontal: DefaultStyles.DefaultPadding * 0.38 } ]}
                >
                    <SvgUri
                        width="100%"
                        height="100%"
                        uri={layout.logo}
                    />
                </TouchableOpacity>
            </View>
            <View style={[ styles.item ]}>
                {
                    layout.search &&
                        <TouchableOpacity
                            onPress={() => console.log('Pressed')}
                            style={[ { marginHorizontal: DefaultStyles.DefaultPadding * 0.38 } ]}
                        >
                            <SearchIcon
                                width={24}
                                height={24}
                            />
                        </TouchableOpacity>
                }
                {
                    layout.pincode &&
                        <TouchableOpacity
                            onPress={() => console.log('Pressed')}
                            style={[ { marginHorizontal: DefaultStyles.DefaultPadding * 0.38 } ]}
                        >
                            <LocationIcon
                                width={24}
                                height={24}
                            />
                        </TouchableOpacity>
                }
                {
                    layout.cart &&
                        <TouchableOpacity
                            onPress={() => console.log('Pressed')}
                            style={[ { marginHorizontal: DefaultStyles.DefaultPadding * 0.38 } ]}
                        >
                            <CartIcon
                                width={24}
                                height={24}
                            />
                        </TouchableOpacity>
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    item: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    icon: {
        width: 32,
        height: 32,
    },
    logo: {
        width: 82,
        height: 32,
    },
});

export default Header;
