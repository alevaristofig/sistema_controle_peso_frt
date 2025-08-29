import { combineReducers } from "@reduxjs/toolkit";

import  pesoSlice  from "./peso/slice";
import  pessoaSlice  from "./pessoa/slice";

const rootReducer = combineReducers({
    peso: pesoSlice,
    pessoa: pessoaSlice,
})


export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>