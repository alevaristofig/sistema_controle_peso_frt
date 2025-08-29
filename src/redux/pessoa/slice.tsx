import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import { IPessoaState } from "../../interfaces/pessoa/pessoastate.interface";

const initialState: IPessoaState = {
    pessoas: {
        'dados': []
    },
    loading: false
}

export const pessoaSlice = createSlice({
    name: 'pessoa',
    initialState,
    reducers: {}
});

export const {} = pessoaSlice.actions;

export default pessoaSlice.reducer;
