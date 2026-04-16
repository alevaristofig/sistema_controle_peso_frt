import { ReactElement, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";

import { FiHome } from 'react-icons/fi';
import { VscPerson } from "react-icons/vsc";
import { LiaWeightHangingSolid } from 'react-icons/lia';
import { GiWeightLiftingUp } from 'react-icons/gi';
import { MdLibraryBooks } from 'react-icons/md';

import { RootState } from "../../redux/root-reducer";

import { buscarPrimeiroPeso, buscarUltimoPeso } from "../../redux/peso/slice";

import usePessoa from "../../hooks/Pessoa/pessoaHook";
import useTreino from "../../hooks/Treino/treinoHook";

import HomePeso from "../../componentes/Home/home-peso";
import TreinoPessoa from '../../componentes/Treinos/treinoPessoa';
import Cabecalho from "../../componentes/Cabecalho";

import { ITreino } from "../../interfaces/treino/treino.interface";

import styles from './Home.module.css';

const Home = (): ReactElement  => {

    const dispatch = useDispatch();

    const { primeiroPeso, ultimoPeso } = useSelector((state: RootState) => state.peso);
    const { buscar } = usePessoa();    
    const { listarQuantidadeTreinos } = useTreino();

    const [buscarError,setBuscarErro] = useState<boolean>(false);
    const [nome,setNome] = useState<string>('');
    const [altura,setAltura] = useState<number>();
    const [endereco,setEndereco] = useState<string>('');
    const [treinosFeito] = useState<string>('S');
    const [treinosNaoFeito] = useState<string>('N');
    const [treinosFeitos,setTreinosFeitos] = useState<ITreino[]>([]);
    const [treinosNaoFeitos,setTreinosNaoFeitos] = useState<ITreino[]>([]);
    const [urlGuia] = useState<string>('https://bvsms.saude.gov.br/bvs/publicacoes/guia_alimentar_populacao_brasileira_2ed.pdf');

    const IconePerson = VscPerson as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
    const IconePeso2 = GiWeightLiftingUp as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
    const IconeGuia = MdLibraryBooks as unknown as React.FC<React.SVGProps<SVGSVGElement>>;


    const buscarDados = async(): Promise<void> => {
        try {
            let dados = await buscar();

            setNome(dados.nome);               
            setAltura(dados.altura);   
            setEndereco(dados.endereco);   
        } catch(error : any) {
             toast.error(error.message);
            setBuscarErro(true);
        }
    }

    const buscarQuantidadeTreinoFeito = async(): Promise<void> => {
        let dados = await listarQuantidadeTreinos(treinosFeito);

        if(dados) {
            setTreinosFeitos([dados]);
        }        
    }

    const buscarQuantidadeTreinoNaoFeito = async(): Promise<void> => {
        let dados = await listarQuantidadeTreinos(treinosNaoFeito);

        if(dados) {
            setTreinosNaoFeitos([dados]);
        }        
    }

    useEffect(() => {            

        buscarDados();
        buscarQuantidadeTreinoFeito();
        buscarQuantidadeTreinoNaoFeito();
        dispatch(buscarPrimeiroPeso());
        dispatch(buscarUltimoPeso());
    },[]);

    return(
        <>
            <Cabecalho />
            <div className={styles.content}>
                <div className="container py-4">
                    {
                        buscarError
                        ?
                            <div className="container py-4">
                                <div className="col">
                                    Não foi possível carregar os dados   
                                </div>                                                                     
                            </div>
                        :
                            <div className="my-3 p-3 bg-body rounded shadow-sm">
                                <div className='row'>
                                    <div className="text-body-secondary pt-3 col marginLinha">
                                        <IconePerson color="#000" fontSize={24} />
                                        <span className='ms-2'>{nome}</span>
                                        <span className='ms-2'>{altura}</span>
                                        <span className='ms-3'>{endereco}</span>
                                        <span className='ms-3 mb-2 float-end'>
                                            <Link to={`/pessoadados/1`} className="btn btn-info text-white">Editar</Link>
                                        </span>
                                    </div>
                                    <hr />                                    
                                </div>
                                <div className='row'>
                                    <div className="text-body-secondary pt-3 col marginLinha">
                                        {   primeiroPeso 
                                            && ultimoPeso 
                                            &&  
                                            <HomePeso primeiroPeso={primeiroPeso} ultimoPeso={ultimoPeso}/>
                                        }                                        
                                        <span className='ms-3 mb-2 float-end'>
                                            <Link to={`/peso/0`} className="btn btn-info text-white">Ver Pesos</Link>
                                        </span>
                                    </div>
                                    <hr />  
                                </div>
                                <div className='row'>
                                    <div className="text-body-secondary pt-3 col marginLinha">
                                        <IconePeso2 color="#000" fontSize={24} className='float-start' /> 
                                        <span className='ms-2 float-start'>
                                            <TreinoPessoa treinoFeitosDados={treinosFeitos} treinoNaoFeitosDados={treinosNaoFeitos} />                                                          
                                        </span>
                                        <span className='ms-3 mb-2 float-end'>
                                            <Link to={`/treino/0`} className="btn btn-info text-white">Ver Treinos</Link>
                                        </span>
                                    </div>
                                    <hr />
                                </div>
                                <div className='row'>
                                    <div className="text-body-secondary pt-3 col marginLinha">
                                        <IconeGuia color="#000" fontSize={24} className='float-start' />  
                                        <span className='ms-2 float-start'>   
                                            <a className='linkGuia link-underline-info' href={urlGuia} target='_blank'>
                                                Guia Alimentar Para a População Brasileira
                                            </a>
                                        </span> 
                                    </div>
                                </div>
                            </div>
                    }
                </div>                
            </div>            
        </>
    )
}

export default Home;