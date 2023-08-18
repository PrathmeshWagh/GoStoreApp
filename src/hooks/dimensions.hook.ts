import { useWindowDimensions } from 'react-native';

const useDimensions = () => {
    const dimensions = useWindowDimensions();

    return {
        width: dimensions.width,
        height: dimensions.height,
    };

};

export default useDimensions;
