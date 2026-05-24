import { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router';
import { ToastContainer } from "react-toastify";

import { RootState } from "../../redux/root-reducer";
import { buscar } from '../../redux/alimento/slice';
import useAlimento from '../../hooks/Alimento/alimentoHook';

import Cabecalho from "../../componentes/Cabecalho";
import ModalToken from '../../componentes/Token';

import styles from '../Home/Home.module.css';


const EditarAlimento = (): ReactElement => {

    const dispatch = useDispatch();
    const { loading, alimentos, revalidarToken } = useSelector((state: RootState) => state.alimento);

    const [nome,setNome] = useState<string>('');
    const [quantidade,setQuantidade] = useState<number>();
    const [caloria,setCaloria] = useState<number | string>();

    const { formatarCaloria } = useAlimento();
    const { id } = useParams();

    const mascaraCaloria = (calorias: string): void => {
        setCaloria(formatarCaloria(calorias));
    }

    useEffect(() => { 
        const alimentoAtual = alimentos.dados?.[0];
        
        if (!loading && Number(alimentoAtual?.id) !== Number(id)) {
            dispatch(buscar({ id }));
            return;
        }  
        
         // Quando os dados chegarem, popula os states
        if (alimentos.dados && alimentos.dados.length > 0) {
            const alimentoData = alimentos.dados[0];

            setNome(alimentoData.nome);
            setQuantidade(parseInt(alimentoData.quantidade));
            setCaloria(alimentoData.calorias);
        }
    },[id, alimentos.dados, dispatch]);

    const salvarAlimento = (): void => {}

    return(
        <>
            <Cabecalho />
            {
                revalidarToken
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
                    <form className="form-perfil" onSubmit={salvarAlimento}>
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
                                <label className="form-label">Quantidade</label>
                                <label className={`form-label ${styles.obrigatorio}`}>*</label>
                                <input 
                                    type='text'
                                    className="form-control" 
                                    value={quantidade}                                 
                                    onChange={(e) => setQuantidade(parseInt(e.target.value))} 
                                    required 
                                /> 
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col">
                                <label className="form-label">Calorias</label>
                                <label className={`form-label ${styles.obrigatorio}`}>*</label>
                                <input 
                                    type='text'
                                    className="form-control" 
                                    value={caloria}                                 
                                    onChange={(e) => mascaraCaloria(e.target.value)} 
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

export default EditarAlimento;