import { useEffect } from "react";
import { useDispatch, UseDispatch, useSelector } from "react-redux";
import { setAuth, logout } from "../../redux/auth/slice";
import { authService } from "../../service/auth";

export const useAuth = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state: any) => state.auth);

    useEffect(() => {
        const user = authService.getUser();

        if(user && !auth.isAuthenticated) {
            dispatch(setAuth(user));
        }

        if(!user && auth.isAuthenticated) {
            dispatch(logout());
        }
            
    },[dispatch]);

    return auth;
}
