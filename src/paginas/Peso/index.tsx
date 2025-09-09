import { ReactElement, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from "react-toastify";

import { RootState } from "../../redux/root-reducer";
import { listar } from "../../redux/peso/slice";

import Cabecalho from "../../componentes/Cabecalho";
import Titulo from "../../componentes/Titulo";

import styles from '../Home/Home.module.css';

const Peso = (): ReactElement => {

    const dispatch = useDispatch();

    const { loading, pesos } = useSelector((state: RootState) => state.peso); 

    const navigate = useNavigate();

    useEffect(() => {
        if(sessionStorage.getItem('token') == null) {           
            navigate('/login');
        }

        dispatch(listar());

    },[]);

    const formatarData = (dataFormatada: Date): string => {
        let data = new Date(dataFormatada);

        return data.toLocaleDateString('pt-BR');
    }

    const apagarPeso = (id: number): void => {
        dispatch(apagar({
            "id": id
        }));
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
                        pesos.dados.length === 0 
                        ?
                            <div className="row mt-4">
                                <div className="col">
                                    <span>Nenhuma pessoa encontrada</span>                                    
                                </div>
                            </div>
                        :
                            <div className="row mt-4">
                                <div className="col-sm table-responsive">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Peso</th>
                                                <th>Imc</th>
                                                <th>Data</th>
                                                <th>Diferença Peso</th>
                                                <th>#</th>                                                        
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                pesos.dados.map((m,i) => {
                                                    return(
                                                        <tr key={i}>
                                                            <td>{m.id}</td>
                                                            <td>{m.valor}</td>
                                                            <td>{m.imc}</td>
                                                            <td>{formatarData(m.dataCadastro)}</td>
                                                            <td>
                                                                {
                                                                    i === 0
                                                                    ?
                                                                        0
                                                                    :
                                                                        (pesos.dados[i].valor - pesos.dados[i-1].valor) > 0
                                                                        ?
                                                                            <span className='text-danger'>
                                                                                {(pesos.dados[i].valor - pesos.dados[i-1].valor).toFixed(2)}
                                                                            </span>
                                                                        :
                                                                            <span className='text-success'>
                                                                                {(pesos.dados[i].valor - pesos.dados[i-1].valor).toFixed(2)}
                                                                            </span>
                                                                }
                                                            </td>
                                                            <td>
                                                                <Link to={`/editarpeso/${m.id}`} className="btn btn-info float-start me-4">Editar</Link>
                                                                <button type='button' 
                                                                                className="btn btn-danger float-start" 
                                                                                onClick={() => apagarPeso(m.id)}>
                                                                    Apagar
                                                                </button>                                                                        
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
            <div>Peso</div>
        </>
    )
}

export default Peso;