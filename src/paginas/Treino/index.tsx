import { useEffect, useState, ReactElement, FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from "react-toastify";

import { RootState } from "../../redux/root-reducer";
import { listar } from "../../redux/treino/slice";
import { listarSemPaginacao } from "../../redux/exercicio/slice";

import Treinos from "../../componentes/Treinos/treino";

import Cabecalho from "../../componentes/Cabecalho";
import Titulo from "../../componentes/Titulo";

import styles from '../Home/Home.module.css';
import { ITreinoComponente } from "../../interfaces/treino/treino-componente.interface";

const Treino = (): ReactElement => {

    const dispatch = useDispatch();

    const { loading, treinos } = useSelector((state: RootState) => state.treino); 
    const { exerciciosSemPaginacao } = useSelector((state: RootState) => state.exercicio);

    const { page } = useParams();

    const navigate = useNavigate();

    const [data,setData] = useState<string>('');
    const [diaSemana,setDiaSemana] = useState<string>('');

    useEffect(() => {
        if(sessionStorage.getItem('token') == null) {           
            navigate('/login');
        }
    
        let dataAtual = new Date();

        setData(dataAtual.toLocaleDateString());

        dispatch(listar({
            'page': page
        }));

        dispatch(listarSemPaginacao());

        formatarDiaSemana(dataAtual);
    },[]);

    const formatarDiaSemana = (dataFormatacao: Date): void => {
        switch(dataFormatacao.getDay()) {
            case 0:
                setDiaSemana('Domingo');
            break;

            case 1:
                setDiaSemana('Segunda-Feira');
            break;

            case 2:
                setDiaSemana('Terça-Feira');
            break;

            case 3:
                setDiaSemana('Quarta-Feira');
            break;

            case 4:
                setDiaSemana('Quinta-Feira');
            break;

            case 5:
                setDiaSemana('Sexta-Feira');
            break;

            case 6:
                setDiaSemana('Sabado');
            break;
        }
    }

    const registrarValoresTreino = (e: React.ChangeEvent<HTMLFormElement>) => {
       // e.preventDefault();
    }

    const registrarTreino = () => {

    }

    const mostrarDivTreino = () => {
        if(typeof treinos.dados == 'object') {

            let dataAtual = new Date();            
            let dataDivTreino = dataAtual.toISOString().split('T')[0];            

            let result = treinos.dados.findIndex((e) => new Date(e.data).toISOString().substring(0,10) === dataDivTreino);

            return result;
        }
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
                        loading
                        ?
                            <div className="spinner-border text-primary mt-3" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        :
                            <div className='row'>                                
                              <Treinos treinosDados={treinos} />                                                               
                            </div>
                    }
                    {
                        exerciciosSemPaginacao.length === 0
                        ?
                            <div className="row mt-4">
                                <div className="col">
                                    <span>Nenhum exercício encontrado </span>                                    
                                </div>
                            </div>
                        :
                            <>
                                <form method='post' onSubmit={registrarTreino}>
                                    <div className="row">
                                        {
                                            exerciciosSemPaginacao.map((e,i) => {     
                                                if(mostrarDivTreino() === -1) {                                                                                                                                       
                                                        return(                                                                                                       
                                                            <div className="col-sm-3 mb-4" key={i}>
                                                                <div className="card">
                                                                    <div className="card-body">
                                                                        <h5 className="card-title">{e.nome}</h5>  
                                                                        <p>{diaSemana} - {data}</p>                                  
                                                                        <div className="form-check form-switch">
                                                                            <input 
                                                                                className="form-check-input" 
                                                                                type="checkbox"
                                                                                value={e.id}                                                                             
                                                                                onChange={(e) => registrarValoresTreino}                                                                            
                                                                            />
                                                                            <label className="form-check-label">Feito</label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>                                                
                                                        )  
                                                    }                                          
                                                })
                                        }
                                    </div>
                                </form>
                            </>
                    }
                </div>
             </div>
        </>
    )
}

export default Treino;