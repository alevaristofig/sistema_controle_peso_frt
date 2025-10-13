import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import { IExercicioState } from "../../interfaces/exercicio/exercicio-state.interface";

const initialState: IExercicioState = {
    exercicios: {
        'dados': [],
        paginacao: null,
        url: ''
    },
    exerciciosSemPaginacao: [],
    modalToken: false,
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
        listarError(state,action) {
            state.loading = false;  
            toast.error(action.payload);         
        },
        listarSemPaginacao(state) {            
            state.loading = true;
        },
        listarSemPaginacaoSucesso(state,action) {
            state.loading = false;
            state.exerciciosSemPaginacao = action.payload;
        },
        listarSemPaginacaoError(state,action) {
            state.loading = false; 
            toast.error(action.payload);               
        },
        revalidarToken(state) {   
            state.modalToken = true;                           
        },
    }
});

export const { revalidarToken, listar, listarSucesso, listarError, listarSemPaginacao, 
               listarSemPaginacaoSucesso, listarSemPaginacaoError } = exercicioSlice.actions;

export default exercicioSlice.reducer;