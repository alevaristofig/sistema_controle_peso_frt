import { ReactElement, useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { InputMask } from "@react-input/mask";
import { TextField } from '@mui/material';


import { RootState } from "../../redux/root-reducer";
import { salvar } from "../../redux/peso/slice";

import usePeso from "../../hooks/Peso/pesoHook";

import Cabecalho from "../../componentes/Cabecalho";
import ModalToken from '../../componentes/Token';

import styles from '../Home/Home.module.css';

const CadastroPeso = (): ReactElement => {

    const dispatch = useDispatch();

    const [pesoValor,setPesoValor] = useState<number>(0.00);
    const [imc,setImc] = useState<number>(0.00);
    const [dataCadastro,setDataCadastro] = useState('');
    const [dataAtualizacao,setDataAtualizacao] = useState<string>("");

    const { formatarPeso } = usePeso();

    //const inputRef = useRef<ReactInputMask | null>(null);

    const mascaraPeso = (peso: string): void => {
        setPesoValor(formatarPeso(peso));
    }

    const calcularImc = (peso: string): void => {
        let pesoAux = parseFloat(peso);
        let imcValor =  pesoAux / (1.70 * 1.70);       

        setImc(parseFloat(imcValor.toFixed(2)));
    }

    const salvarPeso = (e: React.ChangeEvent<HTMLFormElement>): void => {
        e.preventDefault();

        let dataBanco = dataCadastro.split('/');
        let dataAtual = new Date();

        let dataCadastroBanco = new Date(dataBanco[2]+'-'+dataBanco[1]+'-'
                                    +dataBanco[0]
                                    +`T${dataAtual.toLocaleTimeString()}`);

        let dados = {
            'valor': pesoValor,
            'imc': imc,
            'dataCadastro': dataCadastroBanco.toISOString(),
            'dataAtualizacao': dataAtualizacao,            
        }
        
        dispatch(salvar({
            dados
        }));
        
        setPesoValor(0.00);
        setImc(0.00);
        setDataCadastro('');
        //inputRef.current.setInputValue(); 
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
                                <input type="date"  onChange={ e => setDataCadastro(e.target.value)}/>                            
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