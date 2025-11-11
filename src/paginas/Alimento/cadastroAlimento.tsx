import { ReactElement, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from "react-toastify";

import { RootState } from "../../redux/root-reducer";
import { salvar } from '../../redux/alimento/slice';

import useAlimento from '../../hooks/Alimento/alimentoHook';

import Cabecalho from "../../componentes/Cabecalho";
import ModalToken from '../../componentes/Token';

import styles from '../Home/Home.module.css';

const CadastroAlimento = (): ReactElement => {

    const dispatch = useDispatch();

    const { modalToken, loading } = useSelector((state: RootState) => state.alimento); 

    const [nome, setNome] = useState<string>('');
    const [quantidade, setQuantidade] = useState<string>('');
    const [caloria, setCaloria] = useState<number | string>();

    const { formatarCaloria } = useAlimento();

    const mascaraCaloria = (calorias: string): void => {
        setCaloria(formatarCaloria(calorias));
    }

    const salvarAlimento = (): void => {

        dispatch(salvar({
            'nome': nome,
            'quantidade': quantidade,
            'calorias': caloria  
        }));

        setNome('');
        setQuantidade('');
        setCaloria('');
    }

    return(
        <>
            <Cabecalho />
             {
                modalToken
                ?
                    <ModalToken />
                :
                    <div>Não deu certo</div>
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
                                    onChange={(e) => setQuantidade(e.target.value)} 
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
};

export default CadastroAlimento;