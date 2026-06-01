import { IPage } from "../page.interface"
import { IAlimentoDieta } from "./alimentodieta.interface"

export interface IAlimentoDietaResponse {
    _embedded: {
        alimentoDietaModelList: IAlimentoDieta[]
    },
    _links: any,
    page: IPage
}