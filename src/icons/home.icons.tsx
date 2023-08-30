import * as React from "react"
import Svg, { Defs, ClipPath, Path, G } from "react-native-svg"
const HomeIcon = ({ color = '#000', size = 24 }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24">
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M31 748h24v24H31z" data-name="Rectangle 16394" />
            </ClipPath>
        </Defs>
        <G clipPath="url(#a)" transform="translate(-31 -748)">
            <Path
                fill="none"
                stroke={color}
                d="M43 750.5a1 1 0 0 0-.711.3L32.2 759.6a.5.5 0 0 0 .3.9H35v8a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-6h4v6a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-8h2.5a.5.5 0 0 0 .3-.9l-10.083-8.8h-.006a1 1 0 0 0-.711-.3Z"
            />
        </G>
    </Svg>
);
export default HomeIcon;
