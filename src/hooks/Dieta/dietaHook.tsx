import { useState } from "react";

import axios from "axios";

const useDieta = () => {

     const [url,setUrl] = useState(JSON.parse(sessionStorage.getItem('urls')!));
    const [dadosPessoa] = useState(JSON.parse(sessionStorage.getItem('dadosPessoa')!));
    const [urlListar] = useState<string>('listardietaspaginacao');

     const listar = (page: number) => {
        const response =  axios.get(`${url.dietas.href}/${urlListar}/${dadosPessoa.id}?page=${page}`,{
                                        headers: {
                                            "Authorization": `Bearer ${sessionStorage.getItem('token')}` ,
                                        }
                                    })
                                    .then((response) => {                                
                                        return {
                                            dados: response.data.page.totalElements === 0 ? [] : response.data._embedded.dietaModelList,
                                            paginacao: response.data.page,
                                            links: response.data._links,
                                            url: 'dieta'
                                        }
                                    })
                                    .catch((error) => {                                
                                        return false;
                                    });
        
        return response;  
     }

     return { listar };
}

export default useDieta;