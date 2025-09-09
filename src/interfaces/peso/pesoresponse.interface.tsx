import { IPage } from "../page.interface"
import { IPeso } from "./peso.interface"

export interface IPesoResponse {
    _embedded: {
        pesoModelList: IPeso[]
    },
    _links: any,
    page: IPage
}