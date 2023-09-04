import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ModalState = {
    visible: boolean;
    view: string;
    title?: string;
};

const initialState: ModalState = {
    visible: false,
    view: '',
    title: '',
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<{ view: string, title?: string }>) => {
            state.visible = true;
            state.view = action.payload.view;
            state.title = action.payload.title;
        },
        closeModal: (state) => {
            state.visible = false;
        },
    },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
