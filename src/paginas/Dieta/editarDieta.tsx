import { ReactElement, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ToastContainer } from "react-toastify";

import useDieta from '../../hooks/Dieta/dietaHook';

import Cabecalho from "../../componentes/Cabecalho";
import ModalToken from '../../componentes/Token';

import styles from '../Home/Home.module.css';

const EditarDieta = (): ReactElement => {

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
    
        if(sessionStorage.getItem('token') == null) {           
            navigate('/login');
        }  
        
        //buscarAlimento();
    
    },[]);

    return(
        <>
            <div>Editar Dieta</div>
        </>
    )
}

export default EditarDieta;