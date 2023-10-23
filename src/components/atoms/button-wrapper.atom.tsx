import React, { ReactNode } from 'react';
import { TouchableRipple } from 'react-native-paper';

interface ButtonWrapperProps {
    children: ReactNode;
    onPress: () => void;
    styles?: any;
    disabled?: boolean;
}

const ButtonWrapper = (props: ButtonWrapperProps) => {
    const { children, onPress, styles, disabled = false } = props;

    return (
        <TouchableRipple
            onPress={onPress}
            style={[styles]}
            disabled={disabled}
        >
            { children }
        </TouchableRipple>
    );
};

export default ButtonWrapper;
