import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuth, logout } from "../../redux/auth/slice";
import { authService } from "../../service/auth";

export const useAuth = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state: any) => state.auth);

    useEffect(() => {
        const dadosUsuario = authService.getUser();

        if(dadosUsuario && !auth.isAuthenticated) {            
            dispatch(setAuth(dadosUsuario));
        }

        if(!dadosUsuario && auth.isAuthenticated) {            
            dispatch(logout());
        }
            
    },[dispatch]);

    return auth;
}
