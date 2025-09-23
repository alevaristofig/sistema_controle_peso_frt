import { useEffect, useState, ReactElement } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from "react-toastify";

import { VscPerson } from "react-icons/vsc";

import { RootState } from "../../redux/root-reducer";
import { listar } from "../../redux/pessoa/slice";

import Cabecalho from "../../componentes/Cabecalho";
import Titulo from "../../componentes/Titulo";

import styles from '../Home/Home.module.css';

const Pessoa = (): ReactElement => {

    const dispatch = useDispatch();

    const { loading, pessoas } = useSelector((state: RootState) => state.pessoa); 

    const navigate = useNavigate();

    const IconePessoa = VscPerson as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

    useEffect(() => {
        if(sessionStorage.getItem('token') == null) {           
            navigate('/login');
        }

        dispatch(listar());
     },[]);

    return(
        <>
            <Cabecalho />
            <div className={styles.content}>
                <div>
                    <ToastContainer />
                </div> 
                <Titulo nome="Pessoa">
                    <IconePessoa color="#fff" fontSize={24} />
                </Titulo>

                <div className="container py-4">
                    {
                        pessoas.dados.length === 0 
                        ?
                            <div className="row mt-4">
                                <div className="col">
                                    <span>Nenhuma pessoa encontrada</span>                                    
                                </div>
                            </div>
                        :
                            <div className="row mt-4">
                                <div className="col-sm table-responsive">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>                                        
                                                <th scope="col">Nome</th>
                                                <th scope="col">Altura</th>
                                                <th scope="col">E-mail</th>
                                                <th scope="col">Endereço</th> 
                                                <th>#</th>                                                                              
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                pessoas.dados.map((p,i) => {
                                                    return(
                                                        <tr key={i}>
                                                            <td>{p.nome}</td>
                                                            <td>{p.altura}</td>
                                                            <td>{p.email}</td>
                                                            <td>{p.endereco}</td>
                                                            <td>
                                                                <Link to={`/editarpessoa/${p.id}`} className="btn btn-info text-white">Editar</Link>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                    }
                </div>
            </div>
        </>
    )
}

export default Pessoa;