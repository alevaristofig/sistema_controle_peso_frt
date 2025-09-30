import { IPage } from "../page.interface"
import { IAlimento } from "./alimento.interface"

export interface IAlimentoResponse {
    _embedded: {
        pesoModelList: IAlimento[]
    },
    _links: any,
    page: IPage,
}