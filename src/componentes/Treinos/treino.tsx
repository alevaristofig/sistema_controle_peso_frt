import { ITreinoResponse } from "../../interfaces/treino/treino-response.interface";
import { ITreino } from "../../interfaces/treino/treino.interface";

interface ITreinos {
    treinosDados: ITreinoResponse[]
}


const Treino: React.FC<ITreinos> = ({treinosDados}) => {
    return(
        <>
            {
                /*
                typeof treinosDados.dados == 'object' 
                ?
                    treinosDados.dados.map((d,i) => {
                        return(
                            <div className="col-sm-3 mb-4" aria-disabled key={i}>
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">{d.exercicio.nome}</h5>  
                                        <p>{formatarDiaSemana(d.data)} {formatarData(d.data)}</p>                                  
                                        <label className="form-check-label">{d.treino === 'S' ? 'Feito' : 'Não Feito'}</label>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                :
                    ''
                    */
            }
        </>
    )
}

export default Treino;