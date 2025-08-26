import { ReactElement } from "react";
import { Link } from 'react-router-dom';

import { FiHome } from 'react-icons/fi';

import styles from './Cabecalho.module.css';

import avatarImg from '../../assets/coracao.jpeg';

import 'bootstrap/dist/css/bootstrap.css';

const Cabecalho = (): ReactElement => {

    const IconeHome = FiHome as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

    return(
        <>
            <div className={styles.sidebar}>
                <div>
                    <img src={avatarImg} alt='Foto do Usuário'    />            
                </div>

                <Link to="/">
                    <IconeHome color="#fff" fontSize={24} /> Home
                </Link>
            </div>
        </>
    )
}

export default Cabecalho;