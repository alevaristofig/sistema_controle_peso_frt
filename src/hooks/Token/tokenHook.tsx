import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from "axios";

const useToken = () => {

    const [clientId] = useState<string>('sisetemacontrolepesobackend');
    const [password] = useState<string>('ZTmgTeTXlP373rI');
   // const [url] = useState(JSON.parse(sessionStorage.getItem("urls"))); 
    
    const revalidarToken = async (): Promise<void> => {
        let data = {
            grant_type: 'refresh_token',
            refresh_token: sessionStorage.getItem('refresh_token')
        }

        await axios.post(`http://localhost:8080/oauth2/token`,data,{
                    headers: {
                        "Content-Type": 'application/x-www-form-urlencoded',
                    },
                    auth: {
                        username: clientId,
                        password: password
                    } 
                })
                .then((response) => {                                    
                    sessionStorage.removeItem('token');
                    sessionStorage.setItem('token',response.data.access_token);

                    window.location.reload();
                })
                .catch((error) => {                                    
                    toast.error("Ocorreu um erro e a revalidação da senha não pode ser feita!"); 
                });
    }

    return { revalidarToken }
}

export default useToken;