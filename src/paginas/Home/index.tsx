import { useState, useEffect } from "react";

import { FiHome } from 'react-icons/fi';

import Cabecalho from "../../componentes/Cabecalho";
import Titulo from "../../componentes/Titulo";

import styles from './Home.module.css';

const Home = ()  => {

    const IconeHome = FiHome as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

    return(
        <>
            <Cabecalho />
            <div className={styles.content}>
                <Titulo nome="Home">
                    <IconeHome color="#fff" fontSize={24} />
                </Titulo>                
            </div>            
        </>
    )
}

export default Home;