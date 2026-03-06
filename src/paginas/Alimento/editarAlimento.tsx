import { ReactElement, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ToastContainer } from "react-toastify";

import useAlimento from '../../hooks/Alimento/alimentoHook';

import Cabecalho from "../../componentes/Cabecalho";
import ModalToken from '../../componentes/Token';

import styles from '../Home/Home.module.css';


const EditarAlimento = (): ReactElement => {

    const navigate = useNavigate();
    const { id } = useParams();
    const { buscar, formatarCaloria } = useAlimento();

    const [nome,setNome] = useState<string>('');
    const [quantidade,setQuantidade] = useState<number>();
    const [caloria,setCaloria] = useState<number | string>();
    //const [dataCadastro,setDataCadastro] = useState('');
    //const [buscarError,setBuscarErro] = useState(false);   

    const buscarAlimento =  async () => {
        let resp =  await buscar(parseInt(id!));

        setNome(resp.nome);
        setQuantidade(parseInt(resp.quantidade));
        setCaloria(resp.calorias);
    }

    const mascaraCaloria = (calorias: string): void => {
        setCaloria(formatarCaloria(calorias));
    }

    useEffect(() => {
    
        if(sessionStorage.getItem('token') == null) {           
            navigate('/login');
        }  
        
        buscarAlimento();
    
    },[]);

    const salvarAlimento = (): void => {}

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