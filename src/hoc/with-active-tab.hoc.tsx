import React from 'react';
import { useDispatch } from 'react-redux';
import Config from 'react-native-config';

import { updateUrl } from '@slices/webview-url.slice';

interface WrappedComponentProps {
  navigation: any; // You might want to replace 'any' with the actual type
  // ... any other props
}

function withReduxUpdate(WrappedComponent: React.ComponentType<WrappedComponentProps>, newValue: string) {
    return function Component(props: WrappedComponentProps) {
        const dispatch = useDispatch();

        React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            dispatch(updateUrl({ url: `${Config.BASE_WEBVIEW_URL}/${newValue}` }));
        });

        return unsubscribe;
        }, [props.navigation, dispatch]);

        return <WrappedComponent {...props} />;
    };
}

export default withReduxUpdate;
