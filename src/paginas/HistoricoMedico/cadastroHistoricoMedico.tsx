import { ReactElement, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../redux/root-reducer";
import { salvar } from "../../redux/historicomedico/slice";

import Cabecalho from "../../componentes/Cabecalho";
import ModalToken from '../../componentes/Token';

import styles from '../Home/Home.module.css';

const CadastroDieta = (): ReactElement => {

    const dispatch = useDispatch();
    const { modalToken, loading } = useSelector((state: RootState) => state.historicoMedico);


    const [descricao,setDescricao] = useState<string>('');
    const [remedio,setRemedio] = useState<string>('');

    const salvarHistoricoMedico = (e: React.ChangeEvent<HTMLFormElement>): void => {
        e.preventDefault();

        dispatch(salvar({
            descricao: descricao,
            remedio: remedio
        }));

        setDescricao('');
        setRemedio('');
    }

    return(
        <>
            <Cabecalho />
            <div className={styles.content}>
                <div className="container py-4">
                    <form className="form-perfil" onSubmit={salvarHistoricoMedico}>
                        <div className="row mt-3">
                            <div className="col">
                                <label className="form-label">Descrição</label>
                                <label className={`form-label ${styles.obrigatorio}`}>*</label>
                                <input 
                                    type='text'
                                    className="form-control" 
                                    value={descricao}                                 
                                    onChange={(e) => setDescricao(e.target.value)} 
                                    required 
                                />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col">
                                <label className="form-label">Remédio</label>
                                <label className={`form-label ${styles.obrigatorio}`}>*</label>
                                <input 
                                    type='text'
                                    className="form-control" 
                                    value={remedio}                                 
                                    onChange={(e) => setRemedio(e.target.value)} 
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

export default CadastroDieta;