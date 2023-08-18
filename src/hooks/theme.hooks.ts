import { useTheme as theme } from '@react-navigation/native';

const useTheme = () => {
    const { colors } = theme();

    return {
        colors,
    };

};

export default useTheme;
