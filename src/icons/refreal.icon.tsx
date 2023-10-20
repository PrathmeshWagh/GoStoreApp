import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const ReferalIcon = ({ size = 24 }) => (
    <Svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="#3c9645"
    >
        <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 8h6m-5 0a3 3 0 1 1 0 6H9l3 3m-3-6h6m6 1a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
        />
    </Svg>
);

export default ReferalIcon;
