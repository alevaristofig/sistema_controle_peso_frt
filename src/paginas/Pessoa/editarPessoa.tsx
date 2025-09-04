import { FormEvent, ReactElement, useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";

import { VscPerson } from "react-icons/vsc";

import { atualizar } from "../../redux/pessoa/slice";

import usePessoa from "../../hooks/Pessoa/pessoaHook";

import Cabecalho from "../../componentes/Cabecalho";

import styles from '../Home/Home.module.css';

const EditarPessoa = (): ReactElement => {

    const dispatch = useDispatch();

    const { buscar } = usePessoa(); 
    const { id } = useParams<{id: string}>();

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
        let dados = await buscar(parseInt(id!));
    
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

    const atualizarDados = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        let dataAtualizacao = new Date();

        dispatch(atualizar({
            'pessoa': id,
            'nome': nome,
            'email': email,
            'altura': altura,
            'endereco': endereco,
            'senha': senha,
            'dataCadastro': dataCadastro,
            'dataAtualizacao': dataAtualizacao.toISOString()
        })); 

        navigate('/pessoa', {replace: true});
    }

    return(
        <>
            <Cabecalho />
            <div className={styles.content}>                
                {
                    buscarError
                    ?
                        <div className="container py-4">
                            <div className="col">
                                Não foi possível carregar os dados   
                            </div>                                                                     
                        </div>
                    :

                        <div className="container py-4">
                            <form className="form-perfil" onSubmit={atualizarDados}>
                                <div className="row mt-3">
                                    <div className="col">
                                        <label className="form-label me-2">Nome</label>
                                        <label className="form-label text-danger">*</label>
                                        <input 
                                            type="text" 
                                            className="form-control"                                    
                                            defaultValue={nome}
                                            onChange={(e) => setNome(e.target.value)} 
                                            required
                                        /> 
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col">
                                        <label className="form-label me-2">E-mail</label>
                                        <label className="form-label text-danger">*</label>
                                        <input 
                                            type="text" 
                                            className="form-control"
                                            defaultValue={email}
                                            onChange={(e) => setEmail(e.target.value)} 
                                            required
                                        /> 
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col">
                                        <label className="form-label me-2">Altura</label>
                                        <label className="form-label text-danger">*</label>
                                        <input 
                                            type="text" 
                                            className="form-control"
                                            defaultValue={altura}
                                            onChange={(e) => setAltura(parseInt(e.target.value))} 
                                            required
                                        />  
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col">
                                        <label className="form-label me-2">Endereço</label>
                                        <label className="form-label text-danger">*</label>
                                        <input 
                                            type="text" 
                                            className="form-control"
                                            defaultValue={endereco}
                                            onChange={(e) => setEndereco(e.target.value)} 
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col">
                                        <label className="form-label me-2">Senha</label>
                                        <label className="form-label text-danger">*</label>
                                        <input 
                                            type="password" 
                                            className="form-control"
                                            defaultValue={senha}
                                            onChange={(e) => setSenha(e.target.value)} 
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col">
                                        <button type="submit" className="btn btn-primary">Atualizar</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                }
            </div>
        </>
    )
}

export default EditarPessoa;