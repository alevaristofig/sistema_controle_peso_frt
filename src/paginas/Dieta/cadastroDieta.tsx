import { ReactElement, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";

import { RootState } from "../../redux/root-reducer";
import { listarSemPaginacao } from "../../redux/alimento/slice";

import Cabecalho from "../../componentes/Cabecalho";
import Paginacao from '../../componentes/Paginacao';
import ModalToken from '../../componentes/Token';

import styles from '../Home/Home.module.css';
import { IAlimentoId } from "../../interfaces/alimento/alimento-id.interface";

const CadastroDieta = (): ReactElement => {

    const dispatch = useDispatch();
    const { modalToken, alimentos, loading } = useSelector((state: RootState) => state.alimento);

    const navigate = useNavigate();

    const [nome,setNome] = useState<string>('');
    const [alimentosDieta,setAlimentosDieta] = useState<IAlimentoId[]>([]);

    useEffect(() => {

        if(sessionStorage.getItem('token') == null) {           
            navigate('/login');
        }

        dispatch(listarSemPaginacao());

    },[]);

    const registrarAlimentos = (e: React.ChangeEvent<HTMLInputElement>): void => {
        let idAlimento = parseInt(e.target.value);

        if(e.target.checked) { 
            let dados = {
                'idAlimento': idAlimento,
            };

            alimentosDieta.push(dados);           
        } else {
            let indice = alimentosDieta.findIndex((a) => a.idAlimento === idAlimento);
            alimentosDieta.splice(indice,1);
        }
        
         setAlimentosDieta(alimentosDieta);
    }

    const salvarDados =  (e: React.ChangeEvent<HTMLFormElement>): void => {
        e.preventDefault();
        
        let dataAtual = new Date();
        let dados = Array<any>;

        if(alimentosDieta.length > 0) {            
            alimentosDieta.forEach((element,i) => {
                let obj = {
                    'dietaId': 1,
                    'alimentoId': element.idAlimento,
                    'dataCadastro': dataAtual.toISOString(),
                    'dataAtualizacao': null
                }

               // console.log(obj)

               dados[i] = obj;

               // 
                   /* dispatch(salvarDietaAlimento({
                        'dietaId': resultDieta,
                        'alimentoId': element.idAlimento,
                        'dataCadastro': dataAtual.toISOString(),
                        'dataAtualizacao': null
                    }));*/
                });

               // console.log(dados)
        } else {
            toast.error("É necessário selecionar algum Alimento!");   
        }  
        
       // console.log(alimentosDieta);
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
                    <form className="form-perfil" onSubmit={salvarDados}>                        
                        {
                            loading
                            ?
                                <div className="spinner-border text-primary mt-3" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            :
                                alimentos.dados.length === 0 
                                ?
                                    <div className="row mt-4">
                                        <div className="col">
                                            <span>Nenhuma alimento encontrado </span>                                    
                                        </div>
                                    </div>
                                :
                                    <>
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
                                                <label className="form-label">Alimentos</label>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                             {
                                                alimentos.dados.map((a,i) => {
                                                    return(                                                        
                                                        <div className="col-sm-3 mb-4" key={i}>
                                                            <div className="card">
                                                                <div className="card-body">                                                                            
                                                                    <div className='form-check form-check-inline form-switch'>
                                                                        <input 
                                                                            className='form-check-input' 
                                                                            type='checkbox' 
                                                                            value={a.id} 
                                                                            onChange={registrarAlimentos}
                                                                        /> 
                                                                        <label className="form-check-label" htmlFor="inlineCheckbox1">{a.nome} - {a.quantidade}</label>
                                                                    </div>   
                                                                </div> 
                                                            </div>
                                                        </div>
                                                                                                        
                                                    )
                                                })
                                            }
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col">
                                                <button type="submit" className="btn btn-primary">Cadastrar</button>
                                            </div>
                                        </div>
                                    </>
                        }
                    </form>
                </div>
             </div>
        </>
    )
}

export default CadastroDieta;