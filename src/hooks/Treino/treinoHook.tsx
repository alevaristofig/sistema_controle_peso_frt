import { useState } from 'react';

import axios from 'axios';
import { ITreino } from '../../interfaces/treino/treino.interface';
import { IApiLinks } from '../../interfaces/link/apilinks.interface';
import { authService } from '../../service/auth';
import { IPessoa } from '../../interfaces/pessoa/pessoa.interface';

const useTreino = () => {

    const [url] = useState<IApiLinks | null>(authService.getUrls());
    const [dadosPessoa] = useState<IPessoa | null>(authService.getUser());
    const [token] = useState(authService.getToken());
    const [urlListarTreinos] = useState('listartreinos');

    const listarQuantidadeTreinos = async(treino: string): Promise<ITreino | false> => {
        try {
            const response = await axios.get(`${url?.pessoaexercicio.href}/${urlListarTreinos}/${dadosPessoa?.id}/${treino}`,{
                                headers: {
                                    "Authorization": `Bearer ${token}` ,
                                }
                            });                            
            return response.data;
        } catch(error: any) {
             throw new Error(error.response?.data?.userMessage);
        }        
    }

    return { listarQuantidadeTreinos };
}

export default useTreino;