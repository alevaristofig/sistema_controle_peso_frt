import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

import { IPesoState } from "../../interfaces/peso/pesostate.interface";
import { IPeso } from "../../interfaces/peso/peso.interface";

const initialState: IPesoState = {
    pesos: {
        'dados': [],
        paginacao: null,
        url: ''
    },
    primeiroPeso: null,
    ultimoPeso: null,
    loading: false
}

export const pesoSlice = createSlice({
    name: 'peso',
    initialState,
    reducers: {
        listar: (state,action) => {                        
            state.loading = true;
        },
        listarSucesso(state,action) {
            state.loading = false;
            state.pesos = action.payload;
        },
        listarError(state) {
            state.loading = false;  
            toast.error("Ocorreu um erro ao listar os Pesos!");         
        },
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
        apagar(state,action) {
            state.loading = true;
        },
        apgarSucesso(state) {
            state.loading = false;
            toast.success("Peso apagado com Sucesso!");
        },
        apgarError(state) {
            state.loading = false;
            toast.success("Ocorreu um erro ao apagar o peso!");
        },
    }
})

export const { buscarPrimeiroPeso, buscarPrimeiroPesoSucesso, buscarPrimeiroPesoError, 
               buscarUltimoPeso, buscarUltimoPesoSucesso, buscarUltimoPesoError, listar,
               listarSucesso, listarError, apagar, apgarSucesso, apgarError } = pesoSlice.actions;

export default pesoSlice.reducer;
