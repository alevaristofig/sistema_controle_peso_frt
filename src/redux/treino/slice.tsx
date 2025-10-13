import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import { ITreinoState } from "../../interfaces/treino/treino-state";

const initialState: ITreinoState = {
    treinos: {
        'dados': [],
        paginacao: null,
        url: ''
    },
    modalToken: false,
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
        listarError: (state,action) => {
            state.loading = false;
            toast.error(action.payload);
        },
        revalidarToken(state) {   
            state.modalToken = true;                           
        }, 
    }
});

export const { revalidarToken, listar, listarSucesso, listarError } = treinoSlice.actions;

export default treinoSlice.reducer;