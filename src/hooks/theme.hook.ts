import { useTheme as theme } from 'react-native-paper';

const useTheme = () => {
    const { colors } = theme();

    return {
        colors,
    };

};

export default useTheme;
