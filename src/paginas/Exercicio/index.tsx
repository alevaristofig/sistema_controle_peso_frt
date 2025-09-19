import { ReactElement, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from "react-toastify";

import { RootState } from "../../redux/root-reducer";
import { listar } from "../../redux/exercicio/slice";

import Cabecalho from "../../componentes/Cabecalho";
import Titulo from "../../componentes/Titulo";
import Paginacao from '../../componentes/Paginacao';

import styles from '../Home/Home.module.css';

const Exercicio = (): ReactElement => {

    const dispatch = useDispatch();

    const { loading, exercicios } = useSelector((state: RootState) => state.exercicio); 

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

    const formatarData = (dataFormatada: Date): string => {
        let d = new Date(dataFormatada);

        return d.toLocaleDateString('pt-BR')
    }

    const removerExercicio = (id: number) => {

    }

    return(
        <>
            <Cabecalho />
            <div className={styles.content}>
                <div>
                    <ToastContainer />
                </div> 
                <div className="container py-4">
                    {
                        exercicios.dados.length === 0 
                        ?
                            <div className="row mt-4">
                                <div className="col">
                                    <span>Nenhum exercício encontrado</span>                                    
                                </div>
                            </div>
                        :
                            <div className="row mt-4">
                                <div className="col-sm table-responsive">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Nome</th>
                                                <th>Frequência</th>
                                                <th>Tempo</th>
                                                <th>Data Cadastro</th>
                                                <th>Data Atualização</th>
                                                <th>#</th>                                                        
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                exercicios.dados.map((m,i) => {
                                                    return(
                                                        <tr key={i}>
                                                            <td>{m.id}</td>
                                                            <td>{m.nome}</td>
                                                            <td>{m.frequencia}</td>
                                                            <td>{m.tempo}</td>
                                                            <td>{formatarData(m.dataCadastro)}</td>
                                                            <td>{formatarData(m.dataAtualizacao)}</td>
                                                            <td>
                                                            <td>
                                                                <Link to={`/editarexercicio/${m.id}`} className="btn btn-info float-start me-4">Editar</Link>                                                                        
                                                                <button type='button' 
                                                                        className="btn btn-danger float-start" 
                                                                        onClick={() => removerExercicio(m.id)}>Apagar</button>
                                                            </td>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                    }
                </div>
            </div>
        </>
    )
}

export default Exercicio;