import React from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';

export interface TextLoaderProps {
    times?: number;
}

const TextLoader: React.FC<TextLoaderProps> = ({ times = 5 }) => {
    return (
        <ContentLoader
            width={400}
            height={40 * times}
            backgroundColor="#E5E7E9"
            foregroundColor="#CACFD2"
        >
            {Array.from({ length: times }).map((_, index) => (
                <React.Fragment key={index}>
                    <Rect x="0" y={10 + (40 * index)} rx="5" ry="5" width="300" height="24" />
                </React.Fragment>
            ))}
        </ContentLoader>
    );
};

export default TextLoader;
