import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import usePessoa from "../../hooks/Pessoa/pessoaHook";
import { authService } from "../../service/auth";

const Logout = (): null => {

    const { removerToken } = usePessoa();

    const navigate = useNavigate();

    const [urlLogout] = useState<string>("http://localhost:8080");

    useEffect(() => {
    
        async function remover() {
                removerToken(authService.getToken()!);

                authService.logout();
    
                window.location.href = `${urlLogout}/logout`;
            }
    
            remover();
        },[]);

    return null;
}

export default Logout;