import { IPage } from "../page.interface"
import { IExercicio } from "./exercicio.interface"

export interface IExercicioResponse {
    _embedded: {
        exercicioModelList: IExercicio[]
    },
    _links: any,
    page: IPage
}