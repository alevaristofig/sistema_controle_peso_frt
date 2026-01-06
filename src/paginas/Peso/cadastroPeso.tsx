import { ReactElement, useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import InputMask from 'react-input-mask';

import { RootState } from "../../redux/root-reducer";

import usePeso from "../../hooks/Peso/pesoHook";

import Cabecalho from "../../componentes/Cabecalho";
import ModalToken from '../../componentes/Token';

import styles from '../Home/Home.module.css';

const CadastroPeso = (): ReactElement => {

    const [pesoValor,setPesoValor] = useState<number>(0.00);
    const [imc,setImc] = useState<number>(0.00);
    const [dataCadastro,setDataCadastro] = useState('');
    const [dataAtualizacao,setDataAtualizacao] = useState<string>("");

    const { formatarPeso } = usePeso();

    const inputRef = useRef(null);

    const mascaraPeso = (peso: string): void => {
        setPesoValor(formatarPeso(peso));
    }

    const calcularImc = (): void => {

    }

    const salvarPeso = (e: React.ChangeEvent<HTMLFormElement>): void => {
        e.preventDefault();
    }

    return(
        <>
            <Cabecalho />
            <div className={styles.content}>
                <div>
                    <ToastContainer />
                </div> 
                <div className="container py-4">
                    <form className="form-perfil" onSubmit={salvarPeso}>
                        <div className="row mt-3">
                            <div className="col">
                                <label className="form-label">Peso</label>
                                <label className={`form-label ${styles.obrigatorio}`}>*</label>
                                <input 
                                    type='text' 
                                    id='inputPeso'
                                    className="form-control"  
                                    value={pesoValor}                                                                                 
                                    onChange={(e) => mascaraPeso(e.target.value)} 
                                    onBlur={(e) => calcularImc(e.target.value)}
                                    required
                                />    
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col">
                                <label className="form-label">Imc</label>
                                <label className="form-label obrigatorio">*</label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    value={imc}                                    
                                    required />                                
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col">
                                <label className="form-label">Data</label>
                                <label className="form-label obrigatorio">*</label>
                                <InputMask 
                                    mask="99/99/9999" 
                                    name="data" 
                                    className="form-control" 
                                    onChange={ e => setDataCadastro(e.target.value)}
                                    ref={inputRef}
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

export default CadastroPeso;