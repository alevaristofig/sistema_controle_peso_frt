import { ReactElement, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from "react-toastify";

import useDieta from "../../hooks/Dieta/dietaHook";

import Cabecalho from "../../componentes/Cabecalho";
import Paginacao from '../../componentes/Paginacao';

import styles from '../Home/Home.module.css';
import { IDietaResponse } from "../../interfaces/alimento/dieta-response.interface";

const Dieta = (): ReactElement => {

    const { page } = useParams();
    const navigate = useNavigate();

    const [dietas,setDietas] = useState<IDietaResponse>();

    useEffect(() => {

        if(sessionStorage.getItem('token') == null) {           
            navigate('/login');
        }


    },[])

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
                </div>
             </div>
        </>
    )
}

export default Dieta;