import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import { ITreinoState } from "../../interfaces/treino/treinostate";

const initialState: ITreinoState = {
    treinos: {
        'dados': [],
        paginacao: null,
        url: ''
    },
    loading: false
}

export const treinoSlice = createSlice({
    name: 'treino',
    initialState,
    reducers: {
        listar: (state,action) => {
            state.loading = true;            
        },
        listarSucesso: (state,action) => {
            state.loading = false;
            state.treinos = action.payload;
        },
        listarError: (state) => {
            state.loading = false;
            toast.error("Ocorreu um erro ao listar os Treinos!");
        }, 
    }
});

export const { listar, listarSucesso, listarError } = treinoSlice.actions;

export default treinoSlice.reducer;