import { combineReducers } from "@reduxjs/toolkit";

import  pesoSlice  from "./peso/slice";
import  pessoaSlice  from "./pessoa/slice";
import  exercicioSlice  from "./exercicio/slice";
import  treinoSlice  from "./treino/slice";

const rootReducer = combineReducers({
    peso: pesoSlice,
    pessoa: pessoaSlice,
    exercicio: exercicioSlice,
    treino: treinoSlice,
})


export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>