import React from 'react';
import FastImage from 'react-native-fast-image';

interface FastImageProps {
    style?: any;
    url: string;
    mode?: 'cover' | 'contain';
}

const FastImages = (props: FastImageProps) => {
    const { url, style, mode = 'contain' } = props;

    return (
        <FastImage
            style={style}
            source={{
                uri: url,
            }}
            resizeMode={mode}
        />
    );
};

export default FastImages;
