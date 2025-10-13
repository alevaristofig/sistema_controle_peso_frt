import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import { IDietaState } from "../../interfaces/dieta/dieta-state.interface";

const initialState: IDietaState  = {
    dietas: {
        'dados': [],
        paginacao: null,
        url: ''
    },    
    modalToken: false,
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
            state.dietas = action.payload;
        },
        listarError(state,action) {
            state.loading = false;  
            toast.error(action.payload);         
        },
        revalidarToken(state) {   
            state.modalToken = true;                           
        },
    }
});

export const { revalidarToken, listar, listarSucesso, listarError } = dietaSlice.actions;

export default dietaSlice.reducer;