import { IPeso } from "./peso/peso.interface"

export interface IPesoState {
    pesos: {
        dados: IPeso []
    },
    primeiroPeso: number,
    ultimoPeso: number,
    loading: boolean
}