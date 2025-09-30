import { IAlimento } from "./alimento.interface"

export interface IAlimentoState {
    alimentos: {
        dados: IAlimento [],
        paginacao: any,
        url: string
    },
    loading: boolean
}