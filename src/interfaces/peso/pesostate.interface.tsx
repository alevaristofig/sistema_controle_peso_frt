import { IPeso } from "./peso.interface"

export interface IPesoState {
    pesos: {
        dados: IPeso []
    },
    primeiroPeso: number | null,
    ultimoPeso: number | null,
    loading: boolean
}