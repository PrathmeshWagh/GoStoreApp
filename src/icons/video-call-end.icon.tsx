import * as React from 'react';
import Svg from 'react-native-svg';

const VideoCallEndIcon = ({ size = 24, color = '#0F0F0F' }) => (
    <Svg width={size} height={size} fill="none" viewBox="0 0 1024 1024">
        <path
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11.65 6h1.15c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874C16 7.52 16 8.08 16 9.2v.8l2.577-1.546c.793-.476 1.19-.714 1.516-.683a1 1 0 0 1 .713.403c.194.264.194.727.194 1.652v4.348c0 .505 0 .872-.032 1.144M3 3l3 3m15 15-5.018-5.018M6 6c-.988 0-1.506.013-1.908.218a2 2 0 0 0-.874.874C3 7.52 3 8.08 3 9.2v5.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874C4.52 18 5.08 18 6.2 18h6.6c1.12 0 1.68 0 2.108-.218a2 2 0 0 0 .874-.874c.123-.241.177-.524.2-.926M6 6l9.982 9.982"
        />
    </Svg>
);
export default VideoCallEndIcon;
