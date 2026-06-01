import { ReactElement, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from "react-toastify";

import { RootState } from "../../redux/root-reducer";
import { buscar } from '../../redux/dieta/slice';
import { listarSemPaginacao } from '../../redux/alimento/slice';

import useDieta from '../../hooks/Dieta/dietaHook';

import Cabecalho from "../../componentes/Cabecalho";
import ModalToken from '../../componentes/Token';

import styles from '../Home/Home.module.css';
import { IAlimentoId } from '../../interfaces/alimento/alimento-id.interface';
import { IAlimento } from '../../interfaces/alimento/alimento.interface';

const EditarDieta = (): ReactElement => {

    const dispatch = useDispatch();
    const { loading, dietas, revalidarToken } = useSelector((state: RootState) => state.dieta);
    const { alimentos } = useSelector((state: RootState) => state.alimento);
    const { id } = useParams();

    const [nome,setNome] = useState<string>('');
    const [isChecked,setIsChecked] = useState([]);

    useEffect(() => { 
        const dietaAtual = dietas.dados?.[0];
                
        if (!loading && Number(dietaAtual?.id) !== Number(id)) {
            dispatch(buscar({ id }));
            dispatch(listarSemPaginacao());
            return;
        }  
        
            // Quando os dados chegarem, popula os states
        if (dietas.dados && dietas.dados.length > 0
            &&  alimentos.dados && alimentos.dados.length > 0
        ) {
            console.log(dietas.dados);
            const dietaData = dietas.dados[0];
            const dadosAlimentos = alimentos.dados;

            setNome(dietaData.nome); 
            
             dadosAlimentos.forEach((e,i) => {                  
                if(typeof dadosAlimentos.find((d) => d.alimento.id == e.id) == 'object') {
                    isChecked[i] = true;

                    let dados = {
                        'idAlimento': e.id,
                    };

                    alimentosDieta.push(dados);
                } else {
                    isChecked[i] = false;
                }
            });
        }
    },[id, alimentos.dados, dietas.dados, dispatch]);

    const registrarAlimentos = (e: React.ChangeEvent<HTMLInputElement>): void => {}

    const salvarDados = (): void => {}

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
                                                                            id={String(a.id)}                                                                                        
                                                                            defaultChecked={isChecked[i]}
                                                                            onChange={(e) => registrarValoresTreino(e)}
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

export default EditarDieta;