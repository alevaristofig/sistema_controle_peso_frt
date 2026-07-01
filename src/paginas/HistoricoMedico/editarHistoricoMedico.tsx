import { ReactElement, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router';
import { ToastContainer } from "react-toastify";

import { RootState } from "../../redux/root-reducer";
import { salvar, buscar } from "../../redux/historicomedico/slice";

import Cabecalho from "../../componentes/Cabecalho";
import ModalToken from '../../componentes/Token';

import styles from '../Home/Home.module.css';

const EditarHistoricoMedico = (): ReactElement => {

    const dispatch = useDispatch();
    const { modalToken, historicosMedicos, loading } = useSelector((state: RootState) => state.historicoMedico);
    const { id } = useParams();

    const [descricao, setDescricao] = useState<string>('');
    const [remedio, setRemedio] = useState<string>('');


    useEffect(() => {
        const historicosMedicosAtual = historicosMedicos.dados?.[0];

        if (!loading && Number(historicosMedicosAtual?.id) !== Number(id)) {
            dispatch(buscar({ id }));
            return;
        }

        // Quando os dados chegarem, popula os states
        if (historicosMedicos.dados && historicosMedicos.dados.length > 0) {
            const historicoMedicoData = historicosMedicos.dados[0];

            setDescricao(historicoMedicoData.descricao);
            setRemedio(historicoMedicoData.remedio);
        }
    }, [id, historicosMedicos.dados, dispatch]);

    const salvarHistoricoMedico = (e: React.ChangeEvent<HTMLFormElement>): void => {
        e.preventDefault();

        let dataAtual = new Date();

        dispatch(salvar({
            descricao: descricao,
            remedio: remedio,
            dataCadastro: dataAtual.toISOString(),
            dataAtualizacao: null
        }));

        setDescricao('');
        setRemedio('');
    }

    return (
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

export default EditarHistoricoMedico;