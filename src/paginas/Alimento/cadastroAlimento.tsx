import { ReactElement, useState } from 'react';
import { ToastContainer } from "react-toastify";

import Cabecalho from "../../componentes/Cabecalho";

import styles from '../Home/Home.module.css';

const CadastroAlimento = (): ReactElement => {

    const [nome, setNome] = useState<string>('');
    const [quantidade, setQuantidade] = useState<string>('');
    const [caloria, setCaloria] = useState<number>();

    const mascaraCaloria = (calorias: number): void => {
        setCaloria();
    }

    const salvarAlimento = (): void => {

    }

    return(
        <>
            <Cabecalho />
            <div className={styles.content}>
                <div>
                    <ToastContainer />
                </div> 
                <div className="container py-4">
                    <form className="form-perfil" onSubmit={salvarAlimento}>
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
                                <label className="form-label">Quantidade</label>
                                <label className="form-label obrigatorio">*</label>
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
                                <label className="form-label obrigatorio">*</label>
                                <input 
                                    type='text'
                                    className="form-control" 
                                    value={caloria}                                 
                                    onChange={(e) => mascaraCaloria(e.target.value)} 
                                    required 
                                /> 
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
};

export default CadastroAlimento;