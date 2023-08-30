import React, { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

import LayoutWrapper from '../../atoms/layout-wrapper.atom';
import Header from './header.molecule';

interface LayoutProps {
    children: ReactNode;
    styles?: ViewStyle;
    layout: LayoutType;
}

const Layout = (props: LayoutProps) => {
    const { children, layout } = props;

    return (
        <LayoutWrapper>
            <Header layout={layout}/>
            { children }
        </LayoutWrapper>
    );
};

export default Layout;
