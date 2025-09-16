import { ReactElement, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from "react-toastify";

import { RootState } from "../../redux/root-reducer";
import { listar, apagar } from "../../redux/peso/slice";

import Cabecalho from "../../componentes/Cabecalho";
import Titulo from "../../componentes/Titulo";
import Paginacao from '../../componentes/Paginacao';

import styles from '../Home/Home.module.css';

const Peso = (): ReactElement => {

    const dispatch = useDispatch();

    const { loading, pesos, primeiroPeso, ultimoPeso } = useSelector((state: RootState) => state.peso); 

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
                                            <tr>
                                                <td>Total Imc</td>
                                                <td>
                                                    <span>{primeiroPeso!.imc} - {ultimoPeso!.imc} = </span>
                                                    {
                                                        ultimoPeso!.imc - primeiroPeso!.imc < 0
                                                        ?
                                                            <span className='text-success ms-1'>                                                                        
                                                                {(ultimoPeso!.imc - primeiroPeso!.imc).toFixed(2)}
                                                            </span>
                                                        :
                                                            <span className='text-danger ms-1'>
                                                                {(ultimoPeso!.imc - primeiroPeso!.imc).toFixed(2)}
                                                            </span>
                                                    }
                                                </td>
                                                <td>Total Peso Perdido</td>
                                                <td colSpan={3}>
                                                    <span>{primeiroPeso!.valor} - {ultimoPeso!.valor} = </span>
                                                    {
                                                        primeiroPeso!.valor - ultimoPeso!.valor > 0
                                                        ?
                                                            <span className='text-success ms-2'>
                                                                {(primeiroPeso!.valor - ultimoPeso!.valor).toFixed(2)}
                                                            </span>
                                                        :
                                                            <span className='text-danger ms-2'>
                                                                {(primeiroPeso!.valor - ultimoPeso!.valor).toFixed(2)}
                                                            </span>
                                                                
                                                    }
                                                </td>

                                            </tr>
                                        </tbody>
                                    </table>
                                    {
                                        pesos.paginacao.totalPages > 1
                                        ?
                                            <div className='row'>
                                                <Paginacao dados={pesos} />
                                            </div>
                                        :
                                            ''
                                    }
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