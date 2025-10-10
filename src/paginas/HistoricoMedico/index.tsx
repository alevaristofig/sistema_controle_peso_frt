import { ReactElement, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from "react-toastify";

import { RootState } from "../../redux/root-reducer";

import Cabecalho from "../../componentes/Cabecalho";
import Paginacao from '../../componentes/Paginacao';

import styles from '../Home/Home.module.css';

const HistoricoMedico = (): ReactElement => {

    const { page } = useParams();
   
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading } = useSelector((state: RootState) => state.historicoMedico); 

    useEffect(() => {
    
        if(sessionStorage.getItem('token') == null) {           
            navigate('/login');
        }
    
        /*dispatch(listar({
            'page': page
        }));*/
    
    },[]);

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
                            <Link to="/cadastrodieta" className="btn btn-success">Novo Histórico Médico</Link>
                        </div>
                    </div>
                    {
                        loading
                        ?
                            <div className="spinner-border text-primary mt-3" role="status">
                                <span className="visually-hidden">Carregando...</span>
                            </div>
                        :
                            'conteudo'
                    }
                </div>
            </div>
        </>
    )
}

export default HistoricoMedico;