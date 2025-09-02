import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import { IPessoaState } from "../../interfaces/pessoa/pessoastate.interface";

const initialState: IPessoaState = {
    pessoas: {
        'dados': []
    },
    loading: false
}

export const pessoaSlice = createSlice({
    name: 'pessoa',
    initialState,
    reducers: {
        listar: (state) => {
            state.loading = true;            
        },
        listarSucesso: (state,action) => {
            state.loading = false;
            state.pessoas.dados = action.payload;
        },
        listarError: (state) => {
            state.loading = false;
            toast.error("Ocorreu um erro ao listar as Pessoas!");
        },
    }
});

export const { listar, listarSucesso, listarError } = pessoaSlice.actions;

export default pessoaSlice.reducer;
