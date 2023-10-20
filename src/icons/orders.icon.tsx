import * as React from 'react';
import Svg, { Path, ClipPath, Defs, G } from 'react-native-svg';

const OrdersIcon = ({ size = 24, color = '#0F0F0F' }) => (
    <Svg width={size} height={size} color={color} viewBox="0 0 24 24">
        <Defs>
            <ClipPath id="a">
                <Path
                    fill="none"
                    stroke="#707070"
                    d="M262 123h24v24h-24z"
                    data-name="Rectangle 14324"
                />
            </ClipPath>
            <ClipPath id="b">
                <Path fill="#3c9645" d="M1 1h18v18H1z" data-name="Rectangle 19956" />
            </ClipPath>
        </Defs>
        <G
            clipPath="url(#a)"
            data-name="Mask Group 31"
            transform="translate(-262 -123)"
        >
            <G
                fill="#3c9645"
                clipPath="url(#b)"
                data-name="Shopping Cart"
                transform="translate(264 125)"
            >
                <Path
                    d="M18.035 4.058a2.245 2.245 0 0 0-1.727-.808H4.181l-.031-.263A2.25 2.25 0 0 0 1.917 1H1.75a.75.75 0 1 0 0 1.5h.167a.75.75 0 0 1 .745.662l1.032 8.775a3.75 3.75 0 0 0 3.724 3.313h7.832a.75.75 0 0 0 0-1.5H7.418a2.25 2.25 0 0 1-2.118-1.5h8.94a3.75 3.75 0 0 0 3.691-3.085l.591-3.265a2.246 2.246 0 0 0-.487-1.842Z"
                    data-name="Path 83630"
                />
                <Path
                    d="M6.25 19a1.5 1.5 0 1 0-1.5-1.5 1.5 1.5 0 0 0 1.5 1.5Z"
                    data-name="Path 83631"
                />
                <Path
                    d="M13.75 19a1.5 1.5 0 1 0-1.5-1.5 1.5 1.5 0 0 0 1.5 1.5Z"
                    data-name="Path 83632"
                />
            </G>
        </G>
    </Svg>
);
export default OrdersIcon;
