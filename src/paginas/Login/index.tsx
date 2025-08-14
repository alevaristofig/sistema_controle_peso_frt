import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import CryptoJS from 'crypto-js';

const Login = () => {

    const [clientId] = useState('sisetemacontrolepesobackend');
    const [authorizeUrl] = useState('http://localhost:8080/oauth2/authorize');
    const [tokenUrl] = useState('http://localhost:8080/oauth2/token');    
    const [callbackUrl] = useState('http://localhost:3000/login');        
    const [urlPadrao] = useState('http://localhost:8080/v1');
    const [password] = useState('ZTmgTeTXlP373rI');

    const navigate = useNavigate();

    useEffect(() => {
         let params = new URLSearchParams(window.location.search);

         if(params == '') {   
            let codeVerifier = generateRandomString();
            sessionStorage.setItem("codeVerifier", codeVerifier);

            const getCodeChallenge = async () => {
              let codeChallenge = await challenge_from_verifier(codeVerifier);

              if(codeChallenge != '') {
                window.location.href = `${authorizeUrl}?response_type=code&client_id=${clientId}&redirect_uri=${callbackUrl}&code_challenge_method=S256&code_challenge=${codeChallenge}`;
              }
            }

            getCodeChallenge(); 
         } else {
             const gerarToken = async () => {
                let token = await gerarAccessToken(params.get("code"));

                if(token != '') {
                    sessionStorage.setItem("token", token);
                    let urls = await listarUrls();
                    let dadosToken = await buscarDadosToken(token);

                    sessionStorage.setItem('urls',JSON.stringify(urls._links));
                    sessionStorage.setItem('dadosPessoa',JSON.stringify(dadosToken));

                    navigate('/', {replace: true});
                }
             }
         }
    });

    const generateRandomString = () => {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      
        for (let i = 0; i < 128; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
      
        return text;
    }

    const base64urlencode = (codigo: string) => {
        return codigo.toString(CryptoJS.enc.Base64).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
    }

    const challenge_from_verifier = (codeVerifier: string) => {
        return base64urlencode(CryptoJS.SHA256(codeVerifier))
    }

    const gerarAccessToken = async(code: string) => {
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

    const listarUrls = async() => {
        const result = await axios.get(urlPadrao,{
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
                            
        return result;
    }

    const buscarDadosToken = async(token: string) => {
        const result = await axios.get(`${urlPadrao}/pessoas/buscardadostoken/${token}`,{
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
              })
              .then((response) => {                        
                  return response.data;
              })
              .catch((error) => {                          
                  return false;
              }); 
          
        return result;
    }
}