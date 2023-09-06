import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const OfferIcon = ({ isActive = false, size = 24 }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24">
        <Path
            fill={isActive ? '#3a9545' : '#000'}
            d="M7.05 17.7a.74.74 0 0 1-.53-.22.75.75 0 0 1 0-1.06l9.9-9.9a.75.75 0 1 1 1.06 1.06l-9.9 9.9a.74.74 0 0 1-.53.22ZM8.5 10.75a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5Zm0-3a.75.75 0 1 0 .75.75.76.76 0 0 0-.75-.75ZM15.5 17.75a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5Zm0-3a.75.75 0 1 0 .75.75.76.76 0 0 0-.75-.75Z"
        />
    </Svg>
);

export default OfferIcon;
