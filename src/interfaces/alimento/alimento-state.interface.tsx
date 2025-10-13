import { IAlimento } from "./alimento.interface"

export interface IAlimentoState {
    alimentos: {
        dados: IAlimento [],
        paginacao: any,
        url: string
    },
    modalToken: boolean,
    loading: boolean
}