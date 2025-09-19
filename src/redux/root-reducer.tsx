import { combineReducers } from "@reduxjs/toolkit";

import  pesoSlice  from "./peso/slice";
import  pessoaSlice  from "./pessoa/slice";
import  exercicioSlice  from "./exercicio/slice";

const rootReducer = combineReducers({
    peso: pesoSlice,
    pessoa: pessoaSlice,
    exercicio: exercicioSlice,
})


export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>