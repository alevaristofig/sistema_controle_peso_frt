import { combineReducers } from "@reduxjs/toolkit";

import  pesoSlice  from "./peso/slice";
import  pessoaSlice  from "./pessoa/slice";
import  exercicioSlice  from "./exercicio/slice";
import  treinoSlice  from "./treino/slice";
import  alimentoSlice from "./alimento/slice";
import  dietaSlice  from "./dieta/slice";
import  historicoMedicoSlice from './historicomedico/slice';
import  authSlice from './auth/slice';

const rootReducer = combineReducers({
    peso: pesoSlice,
    pessoa: pessoaSlice,
    exercicio: exercicioSlice,
    treino: treinoSlice,
    alimento: alimentoSlice,
    dieta: dietaSlice,
    historicoMedico: historicoMedicoSlice,
    auth: authSlice,
})


export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>