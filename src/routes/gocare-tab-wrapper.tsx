import React from 'react';
import { useDispatch } from 'react-redux';

function withReduxUpdate(WrappedComponent, newValue) {
    console.log(newValue);
    
    return function Component(props) {
        const dispatch = useDispatch();

        React.useEffect(() => {
            const unsubscribe = props.navigation.addListener('focus', () => {
                console.log("Tab clicked");
                // dispatch(updateValue(newValue));  // Dispatch the action when the tab is focused
            });

            return unsubscribe;
        }, [props.navigation, dispatch]);

        return <WrappedComponent {...props} />;
    };
}

export default withReduxUpdate;
