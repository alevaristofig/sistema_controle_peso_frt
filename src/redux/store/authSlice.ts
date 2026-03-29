import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    user: User | null
};

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth(state,action: PayloadAction<User>) {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.user = null;
        }
    }
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;