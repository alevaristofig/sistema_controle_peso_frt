import { ReactElement, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from "react-toastify";

import { RootState } from "../../redux/root-reducer";
import { listar } from "../../redux/dieta/slice";


import Cabecalho from "../../componentes/Cabecalho";
import Paginacao from '../../componentes/Paginacao';

import styles from '../Home/Home.module.css';
import { IDietaResponse } from "../../interfaces/dieta/dieta-response.interface";

const Dieta = (): ReactElement => {

    const { page } = useParams();
   
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, dietas } = useSelector((state: RootState) => state.dieta);    

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

    const apagarDieta = (id: number) => {

    }

    return(
        <>
            <Cabecalho />
            <div className={styles.content}>
                <div>
                    <ToastContainer />
                </div> 
                <div className="container py-4">
                    <div className="row">
                        <div className="col">
                            <Link to="/cadastrodieta" className="btn btn-success">Nova Dieta</Link>
                        </div>
                    </div>
                    {
                        loading
                        ?
                            <div className="spinner-border text-primary mt-3" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        :
                            dietas.dados.length == 0
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
                                                    <th scope="col">#</th>                                     
                                                    <th scope="col">Nome</th>
                                                    <th scope="col">Data Cadastro</th>
                                                    <th scope="col">Data Atualização</th>
                                                    <th scope="col">Ações</th> 
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    dietas.dados?.map((d,i) => {
                                                        return(
                                                            <tr key={i}>
                                                                <td>{d.id}</td>
                                                                <td>{d.nome}</td>
                                                                <td>{formatarData(d.dataCadastro)}</td>
                                                                <td>{formatarData(d.dataAtualizacao)}</td>
                                                                <td>
                                                                    <Link to={`/editardieta/${d.id}`} className="btn btn-info float-start me-4">Editar</Link>                                                                        
                                                                    <button type='button' 
                                                                        className="btn btn-danger float-start" 
                                                                        onClick={() => apagarDieta(d.id)}>Apagar</button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                        {
                                        dietas.paginacao.totalPages > 1
                                        ?
                                            <div className='row'>
                                                <Paginacao pesos={dietas.paginacao} url={dietas.url}/>
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

export default Dieta;