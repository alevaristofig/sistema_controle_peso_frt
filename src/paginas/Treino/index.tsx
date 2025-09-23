import { useEffect, useState, ReactElement } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from "react-toastify";

import { RootState } from "../../redux/root-reducer";
import { listar } from "../../redux/treino/slice";

import Cabecalho from "../../componentes/Cabecalho";
import Titulo from "../../componentes/Titulo";

import styles from '../Home/Home.module.css';

const Treino = (): ReactElement => {

    const dispatch = useDispatch();

    const { loading, treinos } = useSelector((state: RootState) => state.treino); 

    const { page } = useParams();

    const navigate = useNavigate();

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
                    {
                        loading
                        ?
                            <div className="spinner-border text-primary mt-3" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        :
                            <div className='row'>                                
                                                              
                            </div>
                    }
                </div>
             </div>
        </>
    )
}

export default Treino;