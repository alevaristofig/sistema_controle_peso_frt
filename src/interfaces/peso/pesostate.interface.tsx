import { IPeso } from "./peso.interface"

export interface IPesoState {
    pesos: {
        dados: IPeso [],
        paginacao: any,
        url: string
    },
    primeiroPeso: IPeso | null,
    ultimoPeso: IPeso | null,
    loading: boolean
}