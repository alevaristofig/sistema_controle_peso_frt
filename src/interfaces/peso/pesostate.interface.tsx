import { IPeso } from "./peso.interface"

export interface IPesoState {
    pesos: {
        dados: IPeso []
    },
    primeiroPeso: IPeso | null,
    ultimoPeso: IPeso | null,
    loading: boolean
}