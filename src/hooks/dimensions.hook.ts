import { useWindowDimensions, Dimensions } from 'react-native';

const useDimensions = () => {
    const dimensions = useWindowDimensions();
    const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

    return {
        width: dimensions.width,
        height: dimensions.height,
        viewportWidth: viewportWidth,
        viewportHeight: viewportHeight,
    };

};

export default useDimensions;
