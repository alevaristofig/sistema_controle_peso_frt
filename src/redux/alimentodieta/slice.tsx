import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import { IAlimentoDietaState } from "../../interfaces/alimentoDieta/alimentodieta-state.interface";


const initialState: IAlimentoDietaState = {
    aliementosDieta: {
        'dados': [],
        paginacao: null,
        url: ''
    },   
    modalToken: false,
    revalidarToken: false,
    loading: false
}

export const alimentoDietaSlice = createSlice({
    name: 'alimentodieta',
    initialState,
    reducers: {
        buscar: (state,action) => {                                          
            state.loading = true;
            state.aliementosDieta.dados = [];
        },
        buscarSucesso(state,action) {           
            state.loading = false;
            state.aliementosDieta.dados = action.payload;
        },
        buscarError(state, action) {
            state.loading = false;  
            toast.error(action.payload);         
        },
        revalidarToken(state) {              
            state.revalidarToken = true;                           
        }
    }
});

export const { revalidarToken, buscar, buscarSucesso, buscarError } = alimentoDietaSlice.actions;

export default alimentoDietaSlice.reducer;