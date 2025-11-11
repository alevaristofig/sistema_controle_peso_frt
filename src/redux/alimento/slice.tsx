import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import { IAlimentoState } from "../../interfaces/alimento/alimento-state.interface";

const initialState: IAlimentoState = {
    alimentos: {
        dados: [],
        paginacao: null,
        url: ''
    },
    modalToken: false,
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
        listarError: (state,action) => {
            state.loading = false;
            toast.error(action.payload);
        },
        listarSemPaginacao: (state) => {
            state.loading = true;
        },
        listarSemPaginacaoSucesso: (state,action) => {
            state.loading = false;
            state.alimentos = action.payload    
        },
        listarSemPaginacaoError: (state,action) => {
            state.loading = false;
            toast.error(action.payload);  
        },
        salvar: (state,action) => {
            state.loading = true;
        },
        salvarSucesso: (state) => {           
            state.loading = false;
            toast.success("Alimento cadastrado com Sucesso!");
        },
        salvarError: (state,action) => {
            state.loading = false;
            toast.error(action.payload);
        },
        revalidarToken(state) { 
            state.loading = false;                        
            state.modalToken = true;                           
        }
    }
});

export const { revalidarToken, listar, listarSucesso, listarError,
               salvar, salvarSucesso, salvarError, listarSemPaginacao, listarSemPaginacaoSucesso,
               listarSemPaginacaoError } = alimentoSlice.actions;

export default alimentoSlice.reducer;