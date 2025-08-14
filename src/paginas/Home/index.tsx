import { useState, useEffect } from "react";

import { FiHome } from 'react-icons/fi';

import Cabecalho from "../../componentes/Cabecalho";
import Titulo from "../../componentes/Titulo";

import styles from './Home.module.css';

const Home = ()  => {

    const IconeHome = FiHome as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

    const [buscarError,setBuscarErro] = useState(false);

    useEffect(() => {
       /* if(sessionStorage.getItem('token') == null) {           
            navigate('/login');
        }*/
    },[])

    return(
        <>
            <Cabecalho />
            <div className={styles.content}>
                <Titulo nome="Home">
                    <IconeHome color="#fff" fontSize={24} />
                </Titulo>
                <div className="container py-4">
                    <div>Conteudo</div>
                </div>                
            </div>            
        </>
    )
}

export default Home;