import { IDieta } from "./dieta.interface"

export interface IDietaState {
    dietas: {
        dados: IDieta [],
        paginacao: any,
        url: string
    },
    loading: boolean
}