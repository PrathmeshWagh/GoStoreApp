import React from 'react';
import { StyleSheet } from 'react-native';
import { Modal } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import { closeModal } from '@slices/modal.slice';
import { RootState } from 'slices/store';
import LoadingModal from '@molecules/modals/loading.molecule';
import { DefaultStyles } from '@primitives/index';
import { useTheme } from '@hooks/index';

const CustomModal = () => {
    const dispatch = useDispatch();
    const modal = useSelector((state: RootState) => state.modal);
    const { colors } = useTheme();

    const renderView = (view: string) => {
        switch (view) {
            case 'loading':
                return <LoadingModal/>;
            default:
                return null;
        }
    };

    const hideModal = () => {
        dispatch(closeModal());
    };

    return (
        <Modal
            visible={modal.visible}
            onDismiss={hideModal}
            contentContainerStyle={[styles.modalContent, { backgroundColor: colors.onSecondary }]}
        >
            { renderView(modal.view) }
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContent: {
        backgroundColor: '',
        padding: DefaultStyles.DefaultPadding,
        borderRadius: DefaultStyles.DefaultRadius,
        marginHorizontal: DefaultStyles.DefaultPadding - 4,
    },
});

export default CustomModal;
