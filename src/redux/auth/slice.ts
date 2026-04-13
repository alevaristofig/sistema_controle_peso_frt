import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDadosPessoaToken } from "../../interfaces/pessoa/dadospessoatoken.interface";
import { IPessoa } from "../../interfaces/pessoa/pessoa.interface";

type AuthState = {
    isAuthenticated: boolean,
    dadosUsuario: IPessoa | null
};

const initialState: AuthState = {
  isAuthenticated: false,
  dadosUsuario: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth(state,action: PayloadAction<IPessoa>) {
            state.isAuthenticated = true;
            state.dadosUsuario = action.payload;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.dadosUsuario = null;
        }
    }
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;