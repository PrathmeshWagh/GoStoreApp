import * as React from 'react';
import Svg, { Path, ClipPath, Defs, G } from 'react-native-svg';

const AboutIcon = ({ size = 24, color = '#0F0F0F' }) => (
    <Svg width={size} height={size} color={color} viewBox="0 0 24 24">
        <Defs>
            <ClipPath id="a">
                <Path
                    fill="none"
                    stroke="#707070"
                    d="M0 0h24v24H0z"
                    data-name="Rectangle 16535"
                />
            </ClipPath>
        </Defs>
        <G clipPath="url(#a)" data-name="Mask Group 2054">
            <Path
                fill="#3c9645"
                d="M11.15 3.023a9.033 9.033 0 0 0-5.506 2.6 9 9 0 0 0 0 12.752 9.016 9.016 0 0 0 5.259 2.579 13.95 13.95 0 0 0 2.237 0 9.018 9.018 0 0 0 5.245-2.579 8.936 8.936 0 0 0 2.635-6.056 8.959 8.959 0 0 0-2.639-6.693 8.991 8.991 0 0 0-5.119-2.557 13.651 13.651 0 0 0-2.112-.046Zm1.3 4.787a.8.8 0 0 1 .225 1.356.964.964 0 0 1-.743.222.869.869 0 0 1-.882-.847.964.964 0 0 1 1.4-.731Zm.085 2.79a.766.766 0 0 1 .289.19l.109.123v2.381c0 2.762.032 2.526-.38 2.73a.883.883 0 0 1-.535.116 1.016 1.016 0 0 1-.779-.285l-.12-.123-.011-2.391-.007-2.385.081-.123a1.23 1.23 0 0 1 1.352-.233Z"
                data-name="Path 83634"
            />
        </G>
    </Svg>
);
export default AboutIcon;
