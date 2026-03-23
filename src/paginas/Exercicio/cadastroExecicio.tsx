import { ReactElement, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { RootState } from "../../redux/root-reducer";
import { salvar } from "../../redux/exercicio/slice";

import Cabecalho from "../../componentes/Cabecalho";
import ModalToken from '../../componentes/Token';

import styles from '../Home/Home.module.css';

const CadastroExecicio = (): ReactElement => {
    const dispatch = useDispatch();
    const { modalToken, loading } = useSelector((state: RootState) => state.historicoMedico);

    const navigate = useNavigate();

    const [nome,setNome] = useState<string>('');
    const [frequencia,setFrequencia] = useState<string>('');
    const [tempo,setTempo] = useState<string>('');

    useEffect(() => {
        if(sessionStorage.getItem('token') == null) {           
            navigate('/login');
        }
    });

    const salvarExercicio = (e: React.ChangeEvent<HTMLFormElement>): void => {
        e.preventDefault();

        let dataAtual = new Date();
       
        dispatch(salvar({
            'nome': nome,
            'frequencia': frequencia,
            'tempo': tempo,
            'dataCadastro': dataAtual.toISOString(),
            'dataAtualizar': null
        }));

        setNome('');
        setFrequencia('');
        setTempo('');
    }

    return(
        <>
            <Cabecalho />
            {
                modalToken
                ?
                    <ModalToken />
                :
                    ''
            }
            <div className={styles.content}>
                <div>
                    <ToastContainer />
                </div>
                <div className="container py-4">
                    <form className="form-perfil" onSubmit={salvarExercicio}>
                        <div className="row mt-3">
                            <div className="col">
                                <label className="form-label">Nome</label>
                                <label className={`form-label ${styles.obrigatorio}`}>*</label>
                                <input 
                                    type='text'
                                    className="form-control" 
                                    value={nome}                                 
                                    onChange={(e) => setNome(e.target.value)} 
                                    required 
                                />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col">
                                <label className="form-label">Frequência</label>
                                <label className={`form-label ${styles.obrigatorio}`}>*</label>
                                <input 
                                    type='text'
                                    className="form-control" 
                                    value={frequencia}                                 
                                    onChange={(e) => setFrequencia(e.target.value)} 
                                    required 
                                />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col">
                                <label className="form-label">Tempo</label>
                                <label className={`form-label ${styles.obrigatorio}`}>*</label>
                                <input 
                                    type='text'
                                    className="form-control" 
                                    value={tempo}                                 
                                    onChange={(e) => setTempo(e.target.value)} 
                                    required 
                                />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col">
                                <button type="submit" className="btn btn-primary">Cadastrar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CadastroExecicio;