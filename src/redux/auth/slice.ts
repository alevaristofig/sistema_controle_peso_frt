import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDadosPessoaToken } from "../../interfaces/pessoa/dadospessoatoken.interface";

type User = {
    id: number,
    nome: string,
    email: string,
    altura: number,
    endereco: string,
    senha: string,
    dataCadastro: string,
    dataAtualizacao: string
};

type AuthState = {
    isAuthenticated: boolean,
    dadosUsuario: IDadosPessoaToken | null
};

const initialState: AuthState = {
  isAuthenticated: false,
  dadosUsuario: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth(state,action: PayloadAction<IDadosPessoaToken>) {
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