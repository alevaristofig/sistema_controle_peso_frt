import { ReactElement, useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { LiaRunningSolid } from 'react-icons/lia';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from "../../redux/root-reducer";
import { buscar, atualizar } from "../../redux/exercicio/slice";

import Cabecalho from "../../componentes/Cabecalho";
import ModalToken from '../../componentes/Token';


const EditarExercicio = (): ReactElement => {
    const { id } = useParams<{ id: string }>();

    const dispatch = useDispatch();
    const { modalToken, exercicios, loading } = useSelector((state: RootState) => state.exercicio);

    const [nome, setNome] = useState<string>('');
    const [frequencia, setFrequencia] = useState<string>('');
    const [tempo, setTempo] = useState<string>('');
    const [dataCadastro, setDataCadastro] = useState<string>('');
    const [buscarError, setBuscarErro] = useState<boolean>(false);

    useEffect(() => {
        const exerciciosAtual = exercicios.dados?.[0];

        if (!loading && Number(exerciciosAtual?.id) !== Number(id)) {
            dispatch(buscar({ id }));
            return;
        }

        // Quando os dados chegarem, popula os states
        if (exercicios.dados && exercicios.dados.length > 0) {
            const exerciciosData = exercicios.dados[0];

            setNome(exerciciosData.nome);
            setFrequencia(exerciciosData.frequencia.toString());
            setTempo(exerciciosData.tempo.toString());
            setDataCadastro(exerciciosData.dataCadastro.toString());
        }
    }, [id, exercicios.dados, dispatch])

    function salvarDados(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        let dataAtual = new Date();

        dispatch(atualizar({
            'id': id,
            'nome': nome,
            'frequencia': frequencia,
            'tempo': tempo,
            'dataCadastro': dataCadastro,
            'dataAtualizar': dataAtual.toISOString()
        }));
    }

    return (
        <div>
            <Cabecalho />
            {
                modalToken
                ?
                    <ModalToken />
                :
                    ''
            }
            <div className="content">
                <div>
                    <ToastContainer />
                </div>
                <div className="container py-4">
                    <form className="form-perfil" onSubmit={salvarDados}>
                        <div className="row mt-3">
                            <div className="col">
                                <label className="form-label">Nome</label>
                                <label className="form-label obrigatorio">*</label>
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
                                <label className="form-label">Frequência(em dias)</label>
                                <label className="form-label obrigatorio">*</label>
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
                                <label className="form-label">Tempo(em minutos)</label>
                                <label className="form-label obrigatorio">*</label>
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
                                <button type="submit" className="btn btn-primary">Atualizar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditarExercicio;