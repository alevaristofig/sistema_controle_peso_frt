import { ReactElement, useEffect, useState } from "react"
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";

import { VscPerson } from "react-icons/vsc";

import usePessoa from "../../hooks/Pessoa/pessoaHook";

import Cabecalho from "../../componentes/Cabecalho";
import Titulo from "../../componentes/Titulo";

import styles from './Home.module.css';

const EditarPessoa = (): ReactElement => {

    const { buscar } = usePessoa(); 
    const { id } = useParams();

    const navigate = useNavigate();

    const [nome,setNome] = useState<string>('');
    const [email,setEmail] = useState<string>('');
    const [altura,setAltura] = useState<number>();
    const [endereco,setEndereco] = useState<string>();
    const [senha,setSenha] = useState<string>('');
    const [dataCadastro,setDataCadastro] = useState<Date>();
    const [buscarError,setBuscarErro] = useState<boolean>(false);

    const IconePessoa = VscPerson as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

    const buscarDados = async(): Promise<void> => {
        let dados = await buscar(id);
    
        if(typeof dados === 'string') {
            toast.error(dados);  
            setBuscarErro(true);       
        } else {                
            setNome(dados.nome);
            setEmail(dados.email);
            setAltura(dados.altura.toFixed(2));
            setEndereco(dados.endereco);
            setSenha(dados.senha);
            setDataCadastro(dados.dataCadastro);             
        }
    }

    useEffect(() => {
        if(sessionStorage.getItem('token') == null) {           
            navigate('/login');
        }

        buscarDados();

    },[]);

    return(
        <>
            <Cabecalho />
            <div className={styles.content}>
                <Titulo nome="Editar Pessoa">
                    <IconePessoa color="#fff" fontSize={24} />
                </Titulo>
                {
                    buscarError
                    ?
                        <div className="container py-4">
                            <div className="col">
                                Não foi possível carregar os dados   
                            </div>                                                                     
                        </div>
                    :

                        <div className="container py-4"></div>
                }
            </div>
        </>
    )
}

export default EditarPessoa;