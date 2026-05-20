import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from "axios";
import { authService } from '../../service/auth';

const useToken = () => {

    const [clientId] = useState<string>('sisetemacontrolepesobackend');
    const [password] = useState<string>('ZTmgTeTXlP373rI');
    
    const revalidarToken = async (): Promise<void> => {
        let data = {
            grant_type: 'refresh_token',
            refresh_token: authService.getRefreshToken()
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
                    authService.setAuth(response.data.access_token,
                        response.data.refresh_token!,
                        authService.getUser(),
                        authService.getUrls()
                    );                                 

                    window.location.reload();
                })
                .catch((error) => {                                    
                    toast.error("Ocorreu um erro e a revalidação da senha não pode ser feita!"); 
                });
    }

    return { revalidarToken }
}

export default useToken;