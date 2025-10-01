import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

const initialState: any  = {
    dietas: {
        'dados': [],
        paginacao: null,
        url: ''
    },
    exerciciosSemPaginacao: [],
    loading: false
}

export const dietaSlice = createSlice({
     name: 'dieta',
    initialState,
    reducers: {}
});

export const {} = dietaSlice.actions;

export default dietaSlice.reducer;