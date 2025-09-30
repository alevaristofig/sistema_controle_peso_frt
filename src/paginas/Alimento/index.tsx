import { useEffect, useState, ReactElement } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from "react-toastify";

import { RootState } from "../../redux/root-reducer";
import { listar } from "../../redux/alimento/slice";

import Cabecalho from "../../componentes/Cabecalho";
import Paginacao from '../../componentes/Paginacao';

import styles from '../Home/Home.module.css';

const Alimento = (): ReactElement => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, alimentos } = useSelector((state: RootState) => state.alimento); 

    const { page } = useParams();

    useEffect(() => {
        if(sessionStorage.getItem('token') == null) {           
            navigate('/login');
        }

        dispatch(listar({
             'page': page
        }));
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
                            <Link to="/cadastroalimento" className="btn btn-success">Novo Alimento</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Alimento;