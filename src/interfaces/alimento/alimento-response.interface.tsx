import { IPage } from "../page.interface"
import { IAlimento } from "./alimento.interface"

export interface IAlimentoResponse {
    _embedded: {
        alimentoModelList: IAlimento[]
    },
    _links: any,
    page: IPage,
}