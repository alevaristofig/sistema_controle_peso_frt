import { useState } from "react";

import axios, { AxiosResponse } from "axios";
import { IDietaResponse } from "../../interfaces/dieta/dieta-response.interface";
import { IDieta } from "../../interfaces/dieta/dieta.interface";

const useDieta = () => {

    const [url,setUrl] = useState(JSON.parse(sessionStorage.getItem('urls')!));
    const [dadosPessoa] = useState(JSON.parse(sessionStorage.getItem('dadosPessoa')!));
    const [urlListar] = useState<string>('listardietaspaginacao');

    const salvar = async (dados: IDieta): Promise<IDietaResponse | undefined> => {        
        try {
            dados.pessoa = {
                'id': dadosPessoa.id
            };

            const response = await axios.post(`${url.dietas.href}`, dados, {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem('token')}` ,
                }
            });

            return response.data.id;
        } catch(error: any) {           
            return error.response.data.userMessage;
        }
    }

    const buscar = async (id: number): Promise<IDieta> => {
        const result = await axios.get(`${url.dietas.href}/${id}`,{
                                        headers: {
                                            "Authorization": `Bearer ${sessionStorage.getItem('token')}` ,
                                        }
                                    })
                                    .then((response) => {                            
                                        return response.data;
                                    })
                                    .catch((error) => {                                
                                        return error.response.data.userMessage
                                   });

        return result;
    }

    /*const listar = async (page: number): Promise<IDietaResponse | undefined> => {

        try {
            const response = await axios.get(`${url.dietas.href}/${urlListar}/${dadosPessoa.id}?page=${page}`,{
                                        headers: {
                                            "Authorization": `Bearer ${sessionStorage.getItem('token')}` ,
                                        }
                                    });

            let dadosResponse;

            if(response.data.page.totalElements > 0) {
                dadosResponse = {
                    dados: response.data.page.totalElements === 0 ? [] : response.data._embedded.dietaModelList,
                    paginacao: response.data.page,
                    links: response.data._links,
                    url: 'dieta'
                }
            } else {
              
            }
            

            return dadosResponse;  
                                    
        } catch(error: any) {
            console.log(error);
        }        
     }*/

     return { salvar, buscar };
}

export default useDieta;