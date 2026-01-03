import { ReactElement, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from "react-toastify";

import { RootState } from "../../redux/root-reducer";
import { listar } from "../../redux/historicomedico/slice";

import Cabecalho from "../../componentes/Cabecalho";
import Paginacao from '../../componentes/Paginacao';
import ModalToken from "../../componentes/Token";

import styles from '../Home/Home.module.css';

const HistoricoMedico = (): ReactElement => {

    const { page } = useParams();
   
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, historicosMedicos, modalToken } = useSelector((state: RootState) => state.historicoMedico); 

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

    const apagarHistoricoMedico = (id: number): void => {

    }

    return(
        <>
            <Cabecalho />
            {
                modalToken
                ?
                    <ModalToken />
                :
                    ''
            }
            <div className={styles.content}>
                <div>
                    <ToastContainer />
                </div>
                <div className="container py-4">
                    <div className="row">
                        <div className="col">
                            <Link to="/cadastrohistoricomedico" className="btn btn-success">Novo Histórico Médico</Link>
                        </div>
                    </div>
                    {
                        loading
                        ?
                            <div className="spinner-border text-primary mt-3" role="status">
                                <span className="visually-hidden">Carregando...</span>
                            </div>
                        :
                            historicosMedicos.dados.length == 0
                            ?
                                <div className="row mt-4">
                                    <div className="col">
                                        <span>Nenhuma histórico médico encontrado </span>                                    
                                    </div>
                                </div>
                            :
                                <div className="row mt-4">
                                    <div className="col-sm table-responsive">
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Descrição</th>
                                                    <th>Remedio</th>
                                                    <th>Data Cadastro</th>
                                                    <th>Data Atualização</th>
                                                    <th>#</th>                                                        
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                     historicosMedicos.dados?.map((h,i) => {
                                                        return (
                                                            <tr key={i}>
                                                                <td>{h.id}</td>
                                                                <td>{h.descricao}</td>
                                                                <td>{h.remedio}</td>
                                                                <td>{formatarData(h.dataCadastro)}</td>
                                                                <td>{formatarData(h.dataAtualizacao)}</td>
                                                                <td>
                                                                    <Link to={`/editarhistoricomedico/${h.id}`} className="btn btn-info float-start me-4">Editar</Link>                                                                        
                                                                    <button type='button' 
                                                                                className="btn btn-danger float-start" 
                                                                                onClick={() => apagarHistoricoMedico(h.id)}>Apagar</button>

                                                                </td>
                                                            </tr>
                                                        )
                                                     })
                                                }
                                            </tbody>
                                        </table>
                                        {
                                             historicosMedicos.paginacao.totalPages > 1
                                            ?
                                                <div className='row'>
                                                    <Paginacao pesos={historicosMedicos.paginacao} url={historicosMedicos.url}/>
                                                </div>
                                            :
                                                ''
                                        }
                                    </div>
                                </div>
                    }
                </div>
            </div>
        </>
    )
}

export default HistoricoMedico;