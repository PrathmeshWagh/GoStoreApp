import * as React from 'react';
import Svg from 'react-native-svg';

const MicrophoneEndIcon = ({ size = 24, color = '#0F0F0F' }) => (
    <Svg width={size} height={size} fill="none" viewBox="0 0 24 24">
        <path
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 9.4V5a3 3 0 0 0-5.688-1.334M12 19v3m-4 0h8M3 3l18 18M5 10s-1.5 9 7.04 9c2.47 0 4.093-.753 5.153-1.823M19.032 13c.204-1.652-.032-3-.032-3m-4-4h-2m-1 9a3 3 0 0 1-3-3V9l5.123 5.12A2.99 2.99 0 0 1 12 15Z"
        />
    </Svg>
);
export default MicrophoneEndIcon;
