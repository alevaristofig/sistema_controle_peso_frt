import { useState } from "react";

import axios from "axios";

const usePessoa = () => {

    const [url,setUrl] = useState(JSON.parse(sessionStorage.getItem('urls')!));
   // const [urlSemAutenticacao] = useState('http://localhost:8080/v1');
    const [removertoken] = useState<string>('removertoken');

    const buscar = async(id: number) => {
        const response = await axios.get(`${url.pessoas.href}/${id}`,{
                            headers: {
                                "Authorization": `Bearer ${sessionStorage.getItem('token')}` ,
                            }
                            })
                            .then((response) => {                                                                 
                                return response.data;
                            })
                            .catch((error) => {   
                                if(typeof error.response.data.userMessage == 'undefined') {
                                    return 'Ocorreu um erro interno inesperado no sistema.'
                                    + 'Tente novamente e se o problema persistir, entre em contato com o administrador do sistema';
                                }
                                                        
                                return error.response.data.userMessage
                            });
        return response;
    }

    const removerToken = async(token: string): Promise<void> => {
        await axios.delete(`${url.pessoas.href}/${removertoken}/${token}`);
    }

    return { buscar, removerToken }

}

export default usePessoa;