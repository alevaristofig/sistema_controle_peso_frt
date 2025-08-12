import { ReactElement } from "react";
import { Link } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

import avatarImg from '../../assets/coracao.jpeg';

const Cabecalho = (): ReactElement => {
    return(
        <>
            <div className='sidebar'>
                <div>
                    <img src={avatarImg} alt='Foto do Usuário'    />            
                </div>
            </div>
        </>
    )
}