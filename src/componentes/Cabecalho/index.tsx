import { ReactElement } from "react";
import { Link } from 'react-router-dom';

import { FiHome } from 'react-icons/fi';
import { VscPerson } from "react-icons/vsc";
import { LiaWeightHangingSolid, LiaRunningSolid  } from 'react-icons/lia';
import { GiWeightLiftingUp } from 'react-icons/gi';
import { FaBowlFood } from 'react-icons/fa6';

import styles from './Cabecalho.module.css';

import avatarImg from '../../assets/coracao.jpeg';

import 'bootstrap/dist/css/bootstrap.css';

const Cabecalho = (): ReactElement => {

    const IconeHome = FiHome as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
    const IconePessoa = VscPerson as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
    const IconePeso = LiaWeightHangingSolid as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
    const IconeExercicio = LiaRunningSolid as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
    const IconeTreino = GiWeightLiftingUp as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
    const IconeAlimento = FaBowlFood as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
    

    return(
        <>
            <div className={styles.sidebar}>
                <div>
                    <img src={avatarImg} alt='Foto do Usuário'    />            
                </div>

                <Link to="/">
                    <IconeHome color="#fff" fontSize={24} /> Home
                </Link>

                <Link to="/pessoa">
                    <IconePessoa color="#fff" fontSize={24} /> Pessoa
                </Link>

                <Link to="/peso/0">
                    <IconePeso color="#fff" fontSize={24} /> Peso
                </Link>

                <Link to="/exercicio/0">
                    <IconeExercicio  color="#fff" fontSize={24} /> Exercício
                </Link>

                <Link to="/treino/0">
                    <IconeTreino  color="#fff" fontSize={24} /> Treino
                </Link>

                <Link to="/alimento/0">
                    <IconeAlimento  color="#fff" fontSize={24} /> Alimento
                </Link>
            </div>
        </>
    )
}

export default Cabecalho;