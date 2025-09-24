import { IPage } from "../page.interface"
import { ITreino } from "./treino.interface"

export interface ITreinoResponse {
  _embedded: {
    pessoaExercicioModelList: ITreino[]
  },
  _links: any,
  page: IPage
}