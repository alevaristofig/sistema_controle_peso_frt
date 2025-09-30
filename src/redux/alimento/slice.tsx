import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

const initialState = {
    alimentos: {
        'dados': []
    },
    loading: false
}

export const alimentoSlice = createSlice({
    name: 'alimento',
    initialState,
    reducers: {
        listar: (state,action) => {
            state.loading = true;
        },
        listarSucesso: (state,action) => {
            state.loading = false;
            state.alimentos = action.payload            
        },
        listarError: (state) => {
            state.loading = false;
            toast.error("Ocorreu um erro ao listar os Alimentos!");
        },
    }
});

export const { listar, listarSucesso, listarError } = alimentoSlice.actions;

export default alimentoSlice.reducer;