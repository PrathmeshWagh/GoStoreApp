import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from '@routes/rootstack-param-list.routes';

const useEnhancedNavigation = <RouteName extends keyof RootStackParamList = keyof RootStackParamList>() => {
    const nav = useNavigation<StackNavigationProp<RootStackParamList, RouteName>>();
    const router = useRoute<RouteProp<RootStackParamList, RouteName>>();

    const replace = (route: keyof RootStackParamList, params?: any) => {
        nav.dispatch(
            StackActions.replace(route, { ...params })
        );
    };

    return {
        ...nav,
        router,
        replace,
    };
};

export default useEnhancedNavigation;