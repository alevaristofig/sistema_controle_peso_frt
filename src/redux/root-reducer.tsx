import { combineReducers } from "@reduxjs/toolkit";

import  pesoSlice  from "./peso/slice";

const rootReducer = combineReducers({
    peso: pesoSlice
})


export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>