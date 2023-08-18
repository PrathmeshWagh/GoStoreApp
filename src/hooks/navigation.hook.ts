import { useNavigation as navigation } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';

const useNavigation = () => {
    const nav = navigation();

    const replace = (route: string, params?: any) => {
        nav.dispatch(
            StackActions.replace(route, { ...params })
        );
    };

    return {
        navigation: nav,
        replace,
    };
};

export default useNavigation;
