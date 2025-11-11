import { ReactElement, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from "react-toastify";

import { RootState } from "../../redux/root-reducer";
import { listar } from "../../redux/alimento/slice";

import Cabecalho from "../../componentes/Cabecalho";
import Paginacao from '../../componentes/Paginacao';

import styles from '../Home/Home.module.css';

const CadastroDieta = (): ReactElement => {

    const dispatch = useDispatch();
    const { alimentos, loading } = useSelector((state: RootState) => state.alimento);

    const navigate = useNavigate();

    useEffect(() => {

        if(sessionStorage.getItem('token') == null) {           
            navigate('/login');
        }

    },[]);

    const salvarDados=  (): void => {

    }

    return(
        <>
            <Cabecalho />
             <div className={styles.content}>
                <div>
                    <ToastContainer />
                </div> 
                <div className="container py-4">
                    <form className="form-perfil" onSubmit={salvarDados}></form>
                </div>
             </div>
        </>
    )
}

export default CadastroDieta;