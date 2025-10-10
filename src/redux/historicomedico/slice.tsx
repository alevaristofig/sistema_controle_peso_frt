import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

const initialState = {
    historicos: {
        'dados': [],
        paginacao: null,
        url: ''
    },   
    loading: false
}

export const historicoMedicoSlice = createSlice({
    name: 'historicomedico',
    initialState,
    reducers: {}
});

export const {} = historicoMedicoSlice.actions;

export default historicoMedicoSlice.reducer;