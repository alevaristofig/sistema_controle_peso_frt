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
        listarError(state) {
            state.loading = false;  
            toast.error("Ocorreu um erro ao listar os Exercícios!");         
        },
    }
});

export const { listar, listarSucesso, listarError } = historicoMedicoSlice.actions;

export default historicoMedicoSlice.reducer;