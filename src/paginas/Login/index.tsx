import { useState, useEffect, ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import CryptoJS from 'crypto-js';
import { ILink } from '../../interfaces/link/link.interface';
import { IApiLinks } from '../../interfaces/link/apilinks.interface';
import { IRootResponse } from '../../interfaces/link/rootresponse.interface';

const Login = (): null => {

    const [clientId] = useState('sisetemacontrolepesobackend');
    const [authorizeUrl] = useState('http://localhost:8080/oauth2/authorize');
    const [tokenUrl] = useState('http://localhost:8080/oauth2/token');    
    const [callbackUrl] = useState('http://localhost:3000/login');        
    const [urlPadrao] = useState('http://localhost:8080/v1');
    const [password] = useState('ZTmgTeTXlP373rI');

    const navigate = useNavigate();

    useEffect(() => {
         let params: URLSearchParams  = new URLSearchParams(window.location.search);

         if(params.size === 0) {   
            let codeVerifier = generateRandomString();
            sessionStorage.setItem("codeVerifier", codeVerifier);

            const getCodeChallenge = (): void => {
              let codeChallenge = challenge_from_verifier(codeVerifier);

              if(codeChallenge != '') {
                window.location.href = `${authorizeUrl}?response_type=code&client_id=${clientId}&redirect_uri=${callbackUrl}&code_challenge_method=S256&code_challenge=${codeChallenge}`;
              }
            }

            getCodeChallenge(); 
         } else {
             const gerarToken = async () => {             
                let token = await gerarAccessToken(params.get('code')!);

                if(token != '') {                    
                    sessionStorage.setItem("token", token);
                    let urls = await listarUrls();
                    let dadosToken = await buscarDadosToken(token);
console.log(dadosToken);
                    sessionStorage.setItem('urls',JSON.stringify(urls._links));
                    sessionStorage.setItem('dadosPessoa',JSON.stringify(dadosToken));

                   // navigate('/', {replace: true});
                }
             }

             gerarToken();
         }
    },[]);

    const generateRandomString = (): string => {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      
        for (let i = 0; i < 128; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
      
        return text;
    }

    const base64urlencode = (codigo: ReturnType<typeof CryptoJS.SHA256>): string => {           
        return codigo.toString(CryptoJS.enc.Base64).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
    }

    const challenge_from_verifier = (codeVerifier: string): string => {        
        return base64urlencode(CryptoJS.SHA256(codeVerifier))
    }

    const gerarAccessToken = async(code: string): Promise<string> => {
        let params = {
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': callbackUrl,
            'code_verifier': sessionStorage.getItem('codeVerifier')
        };

        const response = await axios.post(tokenUrl,params,{
              headers: {
                "Content-Type": 'application/x-www-form-urlencoded',
              },
              auth: {
                username: clientId,
                password: password
              } 
            })
            .then((response) => {   
              return response.data.access_token;
            })
            .catch((error) => {
              return false;      
            });
        
        return response;
    }

    const listarUrls = async(): Promise<IRootResponse> => {
        const result = await axios.get(urlPadrao,{
                            headers: {
                                "Authorization": `Bearer ${sessionStorage.getItem('token')}` ,
                            }
                        })
                        .then((response) => {                                                   
                            return response.data;
                        })
                        .catch(() => {                            
                            return false;
                        }); 
                            
        return result;
    }

    const buscarDadosToken = async(token: string): Promise<string | boolean> => {
        const result = await axios.get(`${urlPadrao}/pessoas/buscardadostoken/${token}`,{
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
              })
              .then((response) => {                        
                  return response.data;
              })
              .catch(() => {                          
                  return false;
              }); 
          
        return result;
    }

    return null;
}

export default Login;