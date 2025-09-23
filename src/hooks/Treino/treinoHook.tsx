import { useState } from 'react';

import axios from 'axios';
import { ITreino } from '../../interfaces/treino/treino.interface';

const useTreino = () => {

    const [url,setUrl] = useState(JSON.parse(sessionStorage.getItem('urls')!));
    const [urlListarTreinos] = useState('listartreinos');
    const [pessoa] = useState(JSON.parse(sessionStorage.getItem('dadosPessoa')!));

    const listarQuantidadeTreinos = async(treino: string): Promise<ITreino | false> => {
        const response = await axios.get(`${url.pessoaexercicio.href}/${urlListarTreinos}/${pessoa.id}/${treino}`,{
                            headers: {
                                "Authorization": `Bearer ${sessionStorage.getItem('token')}` ,
                            }
                            })
                            .then((response) => {                                                                 
                                return response.data;
                            })
                            .catch((error) => {   
                                return false;
                            });
        return response;
    }

    return { listarQuantidadeTreinos };
}

export default useTreino;