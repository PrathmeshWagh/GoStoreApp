import * as React from 'react';
import Svg from 'react-native-svg';

const MicrophoneIcon = ({ size = 24, color = '#0F0F0F' }) => (
    <Svg width={size} height={size} fill="none" viewBox="0 0 24 24">
        <path
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 10v2a7 7 0 0 1-7 7m-7-9v2a7 7 0 0 0 7 7m0 0v3m-4 0h8M15 6h-2m2 4h-2m-1 5a3 3 0 0 1-3-3V5a3 3 0 1 1 6 0v7a3 3 0 0 1-3 3Z"
        />
    </Svg>
);
export default MicrophoneIcon;
