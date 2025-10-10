import { IHistoricoMedico } from "./historicomedico.interface"

export interface IHistoricoMedicoState {
    historicosMedicos: {
        dados: IHistoricoMedico [],
        paginacao: any,
        url: string
    },
    loading: boolean
}