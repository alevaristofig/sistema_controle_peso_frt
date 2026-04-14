import { useState } from "react";
import { authService } from "../../service/auth";

import axios from "axios";
import { IPessoaResponse } from "../../interfaces/pessoa/pessoaresponse.interface";
import { IPessoa } from "../../interfaces/pessoa/pessoa.interface";
import { IApiLinks } from "../../interfaces/link/apilinks.interface";

const usePessoa = () => {

    const [url] = useState<IApiLinks | null>(authService.getUrls());
    const [dadosPessoa] = useState<IPessoa | null>(authService.getUser());
    const [token] = useState(authService.getToken());
    const [removertoken] = useState<string>('removertoken');

    const buscar = async(): Promise<IPessoa> => {  

        try {
                const response = await axios.get<IPessoa>(`${url?.pessoas.href}/${dadosPessoa?.id}`,{
                                headers: {
                                    "Authorization": `Bearer ${token}` ,
                                }
                            });

                return response.data;
        } catch(error : any) {            
            throw new Error(                
                error.response?.data?.userMessage 
                    ?? 'Ocorreu um erro interno inesperado no sistema.'
                        + 'Tente novamente e se o problema persistir, entre em contato com o administrador do sistema');
        }
    }

    const removerToken = async(token: string): Promise<void> => {
        await axios.delete(`${url?.pessoas.href}/${removertoken}/${token}`);
    }

    return { buscar, removerToken }

}

export default usePessoa;