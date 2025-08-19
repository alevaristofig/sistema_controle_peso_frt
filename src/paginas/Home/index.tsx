import { ReactElement, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";

import { FiHome } from 'react-icons/fi';
import { VscPerson } from "react-icons/vsc";
import { LiaWeightHangingSolid } from 'react-icons/lia';
import { GiWeightLiftingUp } from 'react-icons/gi';

import { RootState } from "../../redux/root-reducer";

import usePessoa from "../../hooks/pessoaHook";
import useTreino from "../../hooks/treinoHook";

import Cabecalho from "../../componentes/Cabecalho";
import Titulo from "../../componentes/Titulo";

import styles from './Home.module.css';
import { ITreino } from "../../interfaces/pessoa/treino.interface";

const Home = (): ReactElement  => {

    const dispatch = useDispatch();

    const { primeiroPeso, ultimoPeso } = useSelector((state: RootState) => state.peso);
    const { buscar } = usePessoa();    
    const { listarQuantidadeTreinos } = useTreino();

    const [dadosPessoa] = useState(JSON.parse(sessionStorage.getItem('dadosPessoa')!));
    const [buscarError,setBuscarErro] = useState<boolean>(false);
    const [nome,setNome] = useState<string>('');
    const [altura,setAltura] = useState<number>();
    const [endereco,setEndereco] = useState<string>('');
    const [treinosFeitos,setTreinosFeitos] = useState<ITreino[]>([]);
    const [treinosNaoFeitos,setTreinosNaoFeitos] = useState<ITreino[]>([]);

    const IconeHome = FiHome as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
    const IconePerson = VscPerson as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
    const IconePeso = LiaWeightHangingSolid as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
    const IconePeso2 = GiWeightLiftingUp as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

    const buscarDados = async() => {
        let dados = await buscar(dadosPessoa.id);

        if(typeof dados === 'string') {
            toast.error(dados);  
            setBuscarErro(true);       
        } else {                
            setNome(dados.nome);               
            setAltura(dados.altura);   
            setEndereco(dados.endereco);             
        }
    }

    const buscarQuantidadeTreinoFeito = async(treino: string): Promise<void> => {
        let dados = await listarQuantidadeTreinos(treino);

        if(dados) {
            setTreinosFeitos([dados]);
        }        
    }

    const buscarQuantidadeTreinoNaoFeito = async(treino: string): Promise<void> => {
        let dados = await listarQuantidadeTreinos(treino);

        if(dados) {
            setTreinosNaoFeitos([dados]);
        }        
    }

    useEffect(() => {
       /* if(sessionStorage.getItem('token') == null) {           
            navigate('/login');
        }*/

        buscarDados();
        buscarQuantidadeTreinoFeito('S');
        buscarQuantidadeTreinoNaoFeito('N');
    },[]);

    return(
        <>
            <Cabecalho />
            <div className={styles.content}>
                <Titulo nome="Home">
                    <IconeHome color="#fff" fontSize={24} />
                </Titulo>
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
                                        <span className='ms-3 float-end'>
                                            <Link to={`/pessoadados/1`} className="btn btn-info">Editar</Link>
                                        </span>
                                    </div>
                                    <hr />                                    
                                </div>
                                <div className='row'>
                                    <div className="text-body-secondary pt-3 col marginLinha">
                                        <IconePeso color="#000" fontSize={24} />
                                        {
                                            primeiroPeso === null
                                            ?
                                                <span className='ms-2 fst-italic'>Não existem registros de pesos para exibir</span>
                                            :
                                                <>
                                                    <span className='ms-2'>Peso Inicial: {primeiroPeso.valor}</span>
                                                    <span className='ms-2'>Peso Atual: {ultimoPeso!.valor}</span>
                                                    <span className='ms-2'>
                                                        {
                                                            primeiroPeso.valor - ultimoPeso!.valor > 0
                                                            ?
                                                                <label>Perdeu: {(primeiroPeso.valor - ultimoPeso!.valor).toFixed(2)}</label>
                                                            :
                                                                <label>Ganhou: {(primeiroPeso.valor - ultimoPeso!.valor).toFixed(2)}</label>
                                                        }
                                                    </span>
                                                    <span className='ms-4'>IMC Inicial: {primeiroPeso.imc}</span>
                                                    <span className='ms-2'>IMC Atual: {ultimoPeso!.imc}</span>
                                                    <span className='ms-2'>
                                                        {
                                                            primeiroPeso.imc - ultimoPeso!.imc > 0
                                                            ?
                                                                <label>Perdeu: {(primeiroPeso.imc - ultimoPeso!.imc).toFixed(2)}</label>
                                                            :
                                                                <label>Ganhou: {(primeiroPeso.imc - ultimoPeso!.imc).toFixed(2)}</label>
                                                        }
                                                    </span>
                                                </>
                                        }
                                        <span className='ms-3 float-end'>
                                            <Link to={`/peso/0`} className="btn btn-info">Ver Pesos</Link>
                                        </span>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className="text-body-secondary pt-3 col marginLinha">
                                        <IconePeso2 color="#000" fontSize={24} className='float-start' /> 
                                        <span className='ms-2 float-start'>
                                            
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