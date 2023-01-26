import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    show: null,
    email: '',
    password: '',
    first_name: '',
    last_name: '',
}

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        clearForm: () => {
            return initialState;
        }
    },
});

export const {
    clearForm,
} = accountSlice.actions;
