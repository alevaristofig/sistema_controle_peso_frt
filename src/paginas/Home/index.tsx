import { useState, useEffect } from "react";

import Cabecalho from "../../componentes/Cabecalho";

import styles from './Home.module.css';

const Home = ()  => {

    return(
        <>
            <Cabecalho />
            <div className={styles.content}>
                <div>Home</div>
            </div>            
        </>
    )
}

export default Home;