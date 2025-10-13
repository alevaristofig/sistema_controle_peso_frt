import { IExercicio } from "../../interfaces/exercicio/exercicio.interface";
import { ITreinoComponente } from "../../interfaces/treino/treino-componente.interface";
import { ITreinoResponse } from "../../interfaces/treino/treino-response.interface";
import { ITreino } from "../../interfaces/treino/treino.interface";
import { ITreinoState } from "../../interfaces/treino/treino-state";

interface ITreinos {
    treinosDados: ITreinoComponente,
}


const Treinos: React.FC<ITreinos> = ({treinosDados}) => {

    function formatarDiaSemana(dataFormatacao: Date) {

        dataFormatacao = new Date(dataFormatacao);

        switch(dataFormatacao.getDay()) {
            case 0:
                return 'Domingo';
            break;

            case 1:
                return 'Segunda-Feira';
            break;

            case 2:
                return 'Terça-Feira';
            break;

            case 3:
                return 'Quarta-Feira';
            break;

            case 4:
                return 'Quinta-Feira';
            break;

            case 5:
                return 'Sexta-Feira';
            break;

            case 6:
                return 'Sabado';
            break;
        }
    }

    function formatarData(data: Date) {
        let dataFormatada = new Date(data);
        
        return dataFormatada.toLocaleDateString();
    }

    return(
        <>
            {                
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
            }
        </>
    )
}

export default Treinos;