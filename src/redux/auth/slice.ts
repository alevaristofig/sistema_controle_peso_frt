import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPessoa } from "../../interfaces/pessoa/pessoa.interface";
import { authService } from "../../service/auth";

type AuthState = {
    isAuthenticated: boolean,
    dadosUsuario: IPessoa | null
};

const initialState: AuthState = {
  isAuthenticated: !!authService.getUser(),
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