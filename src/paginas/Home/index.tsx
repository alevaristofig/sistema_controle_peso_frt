import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { FiHome } from 'react-icons/fi';

import usePessoa from "../../hooks/pessoaHook";

import Cabecalho from "../../componentes/Cabecalho";
import Titulo from "../../componentes/Titulo";

import styles from './Home.module.css';

const Home = ()  => {

    const { buscar } = usePessoa();
    const IconeHome = FiHome as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

    const [dadosPessoa] = useState<Array>(JSON.parse(sessionStorage.getItem('dadosPessoa')!));
    const [buscarError,setBuscarErro] = useState<boolean>(false);
    const [nome,setNome] = useState<string>('');
    const [altura,setAltura] = useState<number>();
    const [endereco,setEndereco] = useState<string>('');

    const buscarDados = async() => {
        let dados = await buscar(dadosPessoa.id);

        if(typeof dados === 'string') {
            toast.error(dados);  
            setBuscarErro(true);       
        } else {                
            setNome(dados.nome);               
            setAltura(dados.altura);   
            setEndereco(dados.endereco);             
        }
    }

    useEffect(() => {
       /* if(sessionStorage.getItem('token') == null) {           
            navigate('/login');
        }*/

        buscarDados();
    },[]);

    return(
        <>
            <Cabecalho />
            <div className={styles.content}>
                <Titulo nome="Home">
                    <IconeHome color="#fff" fontSize={24} />
                </Titulo>
                <div className="container py-4">
                    <div>Conteudo</div>
                </div>                
            </div>            
        </>
    )
}

export default Home;