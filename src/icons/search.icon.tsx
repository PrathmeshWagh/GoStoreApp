import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const SearchIcon = ({ size = 24, color = '#000' }) => (
    <Svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
    >
        <Path
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.796 15.811 21 21m-3-10.5a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z"
        />
    </Svg>
);

export default SearchIcon;
