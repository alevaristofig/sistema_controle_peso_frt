import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

import { IPesoState } from "../../interfaces/peso/pesostate.interface";
import { IPeso } from "../../interfaces/peso/peso.interface";

const initialState: IPesoState = {
    pesos: {
        'dados': []
    },
    primeiroPeso: null,
    ultimoPeso: null,
    loading: false
}

export const pesoSlice = createSlice({
    name: 'peso',
    initialState,
    reducers: {
        buscarPrimeiroPeso: (state) => {
            state.loading = true;
        },
        buscarPrimeiroPesoSucesso: (state, action: PayloadAction<IPeso>) => {
            state.loading = false;
            state.primeiroPeso = action.payload;
        },
        buscarPrimeiroPesoError: (state, action: any) => {
            state.loading = false;
            toast.error(action.payload);
        },
        buscarUltimoPeso: (state) => {
            state.loading = true;            
        },
        buscarUltimoPesoSucesso: (state, action: PayloadAction<IPeso>) => {
            state.loading = false;
            state.ultimoPeso = action.payload;
        },
        buscarUltimoPesoError: (state, action: any) => {
            state.loading = false;  
            toast.error(action.payload);          
        },
    }
})

export const { buscarPrimeiroPeso, buscarPrimeiroPesoSucesso, buscarPrimeiroPesoError} = pesoSlice.actions;

export default pesoSlice.reducer;
