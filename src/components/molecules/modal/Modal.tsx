import React, { FC, useEffect, useRef } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

type ModalProps = {
	open?: boolean;
	children?: React.ReactNode;
	onClose?: () => void;
	rootStyle?: object;
	useBlurBackdrop?: boolean;
	containerStyle?: object;
	variant?: 'center' | 'bottom' | 'extraBottom';
	hideCloseButton?: boolean;
	fullHeight?: boolean;
	overflow?: string;
	headerStyle?: object;
	isAllowedOutsideClick?: boolean;
};

const ModalComponent: FC<ModalProps> = ({
	children,
	open,
	onClose,
	rootStyle,
	useBlurBackdrop,
	containerStyle,
	variant = 'center',
	hideCloseButton,
	fullHeight,
	overflow = 'hidden',
	headerStyle = {},
	isAllowedOutsideClick = true
}) => {
	const modalRootRef = useRef<View>(null);

	useEffect(() => {
		if (open) {
			// Handle modal open logic here
		} else {
			// Handle modal close logic here
		}
	}, [open]);

	return (
		<Modal transparent={true} visible={open} animationType="slide">
			<View style={[styles.modalRoot, rootStyle]}>
				<View style={[styles.modalContainer, styles[variant], containerStyle]}>
					{!hideCloseButton && (
						<View style={[styles.closeButton, headerStyle]}>
							<TouchableOpacity onPress={onClose}>
								<Icon name={'x'} color={'#A2A2A2'} size={22} />
							</TouchableOpacity>
						</View>
					)}
					<View style={[styles.modalContent, { maxHeight: fullHeight ? '100%' : '80%' }]}>
						{children}
					</View>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modalRoot: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)'
	},
	modalContainer: {
		width: '100%',
		backgroundColor: 'white',
		borderRadius: 10,
		elevation: 5
	},
	closeButton: {
		position: 'absolute',
		top: 10,
		right: 10
	},
	center: {
		alignItems: 'center',
		justifyContent: 'center'
	},
	bottom: {
		justifyContent: 'flex-end'
	},
	extraBottom: {
		justifyContent: 'flex-end'
	},
	modalContent: {
		// padding: 20
	}
});

export default ModalComponent;
