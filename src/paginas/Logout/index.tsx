import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import usePessoa from "../../hooks/Pessoa/pessoaHook";

const Logout = (): null => {

    const { removerToken } = usePessoa();

    const navigate = useNavigate();

    const [urlLogout] = useState<string>("http://localhost:8080");

    useEffect(() => {

        if(sessionStorage.getItem('token') == null) {           
            navigate('/login');
        }
    
        async function remover() {
                removerToken(sessionStorage.getItem('token')!);
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('urls');
    
                window.location.href = `${urlLogout}/logout`;
            }
    
            remover();
        },[]);

    return null;
}

export default Logout;