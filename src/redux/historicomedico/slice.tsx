import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import { IHistoricoMedico } from "../../interfaces/historicomedico/historicomedico.interface";
import { IHistoricoMedicoState } from "../../interfaces/historicomedico/historicomedico-state.interface";

const initialState: IHistoricoMedicoState = {
    historicosMedicos: {
        'dados': [],
        paginacao: null,
        url: ''
    },   
    modalToken: false,
    revalidarToken: false,
    loading: false
}

export const historicoMedicoSlice = createSlice({
    name: 'historicomedico',
    initialState,
    reducers: {
        listar: (state,action) => {                                  
            state.loading = true;
        },
        listarSucesso(state,action) {
            state.loading = false;
            state.historicosMedicos = action.payload;
        },
        listarError(state,action) {
            state.loading = false;  
            toast.error(action.payload);         
        },
        buscar: (state,action) => {                        
            state.loading = true;
            state.historicosMedicos.dados = [];
        },
        buscarSucesso(state,action) {           
            state.loading = false;
            state.historicosMedicos.dados[0] = action.payload;
        },
        buscarError(state, action) {
            state.loading = false;  
            toast.error(action.payload);         
        },
        salvar: (state,action) => {
            state.loading = true;
        },
        salvarSucesso: (state) => {
            state.loading = false;
            toast.success("Histórico Médico cadastrado com Sucesso!");
        },
        salvarError: (state,action) => {
            state.loading = false;
            toast.error(action.payload);
        },
        revalidarToken(state) {              
            state.revalidarToken = true;                           
        }
    }
});

export const { revalidarToken, listar, listarSucesso, listarError, buscar, buscarSucesso, buscarError,
               salvar, salvarSucesso, salvarError } = historicoMedicoSlice.actions;

export default historicoMedicoSlice.reducer;