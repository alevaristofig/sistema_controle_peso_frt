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
    reducers: {
        listar: (state,action) => {                                  
            state.loading = true;
        },
        listarSucesso(state,action) {
            state.loading = false;
            state.exercicios = action.payload;
        },
        listarError(state) {
            state.loading = false;  
            toast.error("Ocorreu um erro ao listar os Exercícios!");         
        },
    }
});

export const { listar, listarSucesso, listarError } = dietaSlice.actions;

export default dietaSlice.reducer;