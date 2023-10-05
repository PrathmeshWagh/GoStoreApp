import { useTheme as paperTheme } from 'react-native-paper';

import { CustomColors } from '@constants/index';

const useTheme = () => {
    const { colors: paperColors } = paperTheme();

    return {
        colors: {
            ...paperColors,
            ...CustomColors,
        },
    };

};

export default useTheme;
