import { useEffect } from "react";

import usePessoa from "../../hooks/Pessoa/pessoaHook";

const Logout = (): void => {

    const { removerToken } = usePessoa();

    useEffect(() => {
    
        async function remover() {
                removerToken(sessionStorage.getItem('token'));
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('urls');
    
                window.location.href = `${urlLogout}/logout`;
            }
    
            remover();
        },[]);
}

export default Logout;