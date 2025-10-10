import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

const initialState = {
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

export const {} = historicoMedicoSlice.actions;

export default historicoMedicoSlice.reducer;