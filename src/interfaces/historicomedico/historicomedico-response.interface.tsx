import { IPage } from "../page.interface"
import { IHistoricoMedico } from "./historicomedico.interface"

export interface IHistoricoMedicoResponse {
    _embedded: {
        historicoMedicoModelList: IHistoricoMedico[]
    },
    _links: any,
    page: IPage
}