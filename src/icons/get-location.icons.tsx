import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const GetLocationIcon = ({ size = 24, color = '#0F0F0F' }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24">
         <Path
            fill={color}
            fillRule="evenodd"
            d="M12 16.502a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm0-1.999A2.502 2.502 0 1 1 12 9.5a2.502 2.502 0 0 1 0 5.003Z"
            clipRule="evenodd"
        />
        <Path
            fill={color}
            fillRule="evenodd"
            d="M11 1a1 1 0 1 1 2 0v1.05A10.003 10.003 0 0 1 21.95 11H23a1 1 0 1 1 0 2h-1.05A10.003 10.003 0 0 1 13 21.95V23a1 1 0 1 1-2 0v-1.05A10.003 10.003 0 0 1 2.05 13H1a1 1 0 1 1 0-2h1.05A10.003 10.003 0 0 1 11 2.05V1Zm1 19.002a8.002 8.002 0 1 1 0-16.004 8.002 8.002 0 0 1 0 16.004Z"
            clipRule="evenodd"
        />
    </Svg>
);
export default GetLocationIcon;
