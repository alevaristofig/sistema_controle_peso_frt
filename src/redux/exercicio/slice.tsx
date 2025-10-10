import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import { IExercicioState } from "../../interfaces/exercicio/exerciciostate.interface";

const initialState: IExercicioState = {
    exercicios: {
        'dados': [],
        paginacao: null,
        url: ''
    },
    exerciciosSemPaginacao: [],
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
        listarSemPaginacao(state) {            
            state.loading = true;
        },
        listarSemPaginacaoSucesso(state,action) {
            state.loading = false;
            state.exerciciosSemPaginacao = action.payload;
        },
        listarSemPaginacaoError(state) {
            state.loading = false;                
        },
    }
});

export const { listar, listarSucesso, listarError, listarSemPaginacao, listarSemPaginacaoSucesso, listarSemPaginacaoError } = exercicioSlice.actions;

export default exercicioSlice.reducer;