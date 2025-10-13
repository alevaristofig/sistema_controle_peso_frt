import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import { IPessoaState } from "../../interfaces/pessoa/pessoa-state.interface";

const initialState: IPessoaState = {
    pessoas: {
        'dados': []
    },
    modalToken: false,
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
        listarError: (state,action) => {
            state.loading = false;
            toast.error(action.payload);
        },
        atualizar(state,action) {
            state.loading = true;
        },
        atualizarSucesso(state) {
            state.loading = true;
            toast.success("Pessoa atualizada com Sucesso!");
        },
        atualizarError(state,action) {
            state.loading = true;
            toast.error(action.payload);
        },
        revalidarToken(state) {   
            state.modalToken = true;                           
        },
    }
});

export const { revalidarToken, listar, listarSucesso, listarError, atualizar, atualizarSucesso, atualizarError } = pessoaSlice.actions;

export default pessoaSlice.reducer;
