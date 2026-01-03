import { ReactElement, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

import { RootState } from "../../redux/root-reducer";

import Cabecalho from "../../componentes/Cabecalho";
import ModalToken from '../../componentes/Token';

import styles from '../Home/Home.module.css';

const CadastroPeso = (): ReactElement => {

    return(
        <>
            <div>Cadastro peso</div>
        </>
    )
}

export default CadastroPeso;