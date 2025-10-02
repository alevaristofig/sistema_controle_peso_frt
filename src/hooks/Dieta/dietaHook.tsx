import { useState } from "react";

import axios, { AxiosResponse } from "axios";
import { IDietaResponse } from "../../interfaces/alimento/dieta-response.interface";

const useDieta = () => {

    const [url,setUrl] = useState(JSON.parse(sessionStorage.getItem('urls')!));
    const [dadosPessoa] = useState(JSON.parse(sessionStorage.getItem('dadosPessoa')!));
    const [urlListar] = useState<string>('listardietaspaginacao');

     const listar = async (page: number): Promise<IDietaResponse> => {

        try {
            const response = await axios.get(`${url.dietas.href}/${urlListar}/${dadosPessoa.id}?page=${page}`,{
                                        headers: {
                                            "Authorization": `Bearer ${sessionStorage.getItem('token')}` ,
                                        }
                                    });

            let dadosResponse = {
                dados: response.data.page.totalElements === 0 ? [] : response.data._embedded.dietaModelList,
                paginacao: response.data.page,
                links: response.data._links,
                url: 'dieta'
            }

            return dadosResponse;  
                                    
        } catch(error: any) {
            //tratar erro
        }        
     }

     return { listar };
}

export default useDieta;