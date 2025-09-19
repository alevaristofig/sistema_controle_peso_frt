import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import { IExercicioState } from "../../interfaces/exercicio/exerciciostate.interface";

const initialState: IExercicioState = {
    exercicios: {
        'dados': [],
        paginacao: null,
        url: ''
    },
    loading: false
}

export const exercicioSlice = createSlice({
    name: 'exercicio',
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

export const { listar, listarSucesso, listarError } = exercicioSlice.actions;

export default exercicioSlice.reducer;