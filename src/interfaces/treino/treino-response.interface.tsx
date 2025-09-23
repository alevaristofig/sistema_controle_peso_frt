import { ITreino } from "./treino.interface"

export interface ITreinoResponse {
  _embedded: {
    pessoaExercicioModelList: ITreino[]
  }
}