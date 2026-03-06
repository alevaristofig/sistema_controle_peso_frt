import { useState } from "react";
import axios from "axios";
import { IAlimento } from "../../interfaces/alimento/alimento.interface";

const useAlimento = () => {

    const [url,setUrl] = useState(JSON.parse(sessionStorage.getItem('urls')!));
    const [dadosPessoa] = useState(JSON.parse(sessionStorage.getItem('dadosPessoa')!));

    const buscar = async (id: number): Promise<IAlimento> => {
        const result = await axios.get(`${url.alimentos.href}/${id}`,{
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

    const formatarCaloria = (caloria: string): string | number => {
         if(caloria === '') {
            return '0.00';
        } else {
            let valor1 = caloria + '';
            let valor2 = parseInt(valor1.replace(/[\D]+/g,''));
            let valor3 = valor2 + '';
            valor3 = valor3.replace(/([0-9]{2})$/g, ".$1");
    
            if (valor3.length > 6) {
                valor3 = valor3.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
            }
    
            return valor3;
        }
    }

    return { formatarCaloria, buscar };
}

export default useAlimento;