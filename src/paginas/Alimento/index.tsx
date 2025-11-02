import { useEffect, useState, ReactElement } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from "react-toastify";

import { RootState } from "../../redux/root-reducer";
import { listar } from "../../redux/alimento/slice";

import Cabecalho from "../../componentes/Cabecalho";
import Paginacao from '../../componentes/Paginacao';
import ModalToken from '../../componentes/Token';

import styles from '../Home/Home.module.css';

const Alimento = (): ReactElement => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { modalToken, loading, alimentos } = useSelector((state: RootState) => state.alimento); 

    const { page } = useParams();

    useEffect(() => {
        if(sessionStorage.getItem('token') == null) {           
            navigate('/login');
        }

        dispatch(listar({
             'page': page
        }));
    },[]);

    const formatarData = (dataFormatada: Date): string => {
        let data = new Date(dataFormatada);

        return data.toLocaleDateString('pt-BR');
    }

    const apagarAlimento = (id: number): void => {

    }

    return(
        <>
            <Cabecalho />
            {
                modalToken
                ?
                    <ModalToken />
                :
                    <div>Não deu certo</div>
            }   
            <div className={styles.content}>
                <div>
                    <ToastContainer />
                </div> 
                <div className="container py-4">
                    <div className="row">
                        <div className="col">
                            <Link to="/cadastroalimento" className="btn btn-success">Novo Alimento</Link>
                        </div>                        
                    </div>
                    {
                        loading
                        ?
                            <div className="spinner-border text-primary mt-3" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        :
                            alimentos.dados.length == 0
                            ?
                                <div className="row mt-4">
                                    <div className="col">
                                        <span>Nenhuma alimento encontrado </span>                                    
                                    </div>
                                </div>
                            :
                                <div className="row mt-4">
                                    <div className="col-sm table-responsive">
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Nome</th>
                                                    <th>Quantidade</th>
                                                    <th>Calorias</th>
                                                    <th>Data Cadastro</th>
                                                    <th>Data Atualização</th>
                                                    <th>#</th>                                                        
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                     alimentos.dados?.map((a,i) => {
                                                        return(
                                                            <tr key={i}>
                                                                <td>{a.id}</td>
                                                                <td>{a.nome}</td>
                                                                <td>{a.quantidade}</td>
                                                                <td>{a.calorias}</td>
                                                                <td>{formatarData(a.dataCadastro)}</td>
                                                                <td>{formatarData(a.dataAtualizacao)}</td>
                                                                <td>
                                                                    <Link to={`/editaralimento/${a.id}`} className="btn btn-info float-start me-4">Editar</Link>                                                                        
                                                                    <button type='button' 
                                                                            className="btn btn-danger float-start" 
                                                                            onClick={() => apagarAlimento(a.id)}>Apagar</button>
                                                                </td>
                                                            </tr>
                                                        )
                                                     })
                                                }
                                            </tbody>
                                            {
                                                alimentos.paginacao.totalPages > 1
                                                ?
                                                    <div className='row'>
                                                        <Paginacao pesos={alimentos.paginacao} url={alimentos.url}/>
                                                    </div>
                                                :
                                                    ''
                                            }
                                        </table>
                                    </div>
                                </div>
                    }
                </div>
            </div>
        </>
    )
}

export default Alimento;