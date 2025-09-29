import { ITreino } from "../../interfaces/treino/treino.interface";

interface ITreinoPessoa {
    treinoFeitosDados: ITreino[],
    treinoNaoFeitosDados: ITreino[]
}

const TreinoPessoa: React.FC<ITreinoPessoa> = ({treinoFeitosDados, treinoNaoFeitosDados}) => {
    return(
        <div>
            {
                treinoFeitosDados.length == 0 && treinoNaoFeitosDados.length > 0
                ?
                    treinoNaoFeitosDados.map((t,i) => {
                        return (
                            <>
                                <span className='ms-2 fst-italic'>{}:</span>
                                    <span className='ms-2' >
                                        <label>Feitos: 0 | 
                                        Não Feitos: {}                                    
                                    </label>                                                        
                                </span>
                            </>                
                        )
                    })
                :
                    treinoFeitosDados.length > 0 && treinoNaoFeitosDados.length == 0  
                    ?
                        treinoFeitosDados.map((t,i) => {
                            return (
                                <>
                                    <span className='ms-2 fst-italic'>{}:</span>
                                    <span className='ms-2' >
                                        <label>Feitos: {} | 
                                            Não Feitos: 0                                    
                                        </label>                                                        
                                    </span>
                                </>                
                            )
                        })
                    :
                        treinoFeitosDados.length > 0 && treinoNaoFeitosDados.length > 0 
                        ?
                            treinoFeitosDados.map((t,i) => {
                                return (
                                    <>
                                        <span className='ms-2 fst-italic'>{}:</span>
                                        <span className='ms-2' >
                                            <label>Feitos: {} | 
                                                Não Feitos: {}                                   
                                            </label>                                                        
                                        </span>
                                    </>                
                                )
                            })
                        :
                            <span className='ms-2 fst-italic'>Não exitem registro de treinos para exibir</span>
            }
        </div>
    )
}

export default TreinoPessoa;