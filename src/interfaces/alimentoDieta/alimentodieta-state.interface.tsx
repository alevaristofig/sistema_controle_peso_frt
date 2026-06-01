import { IAlimentoDieta } from "./alimentodieta.interface"

export interface IAlimentoDietaState {
    aliementosDieta: {
        dados: IAlimentoDieta [],
        paginacao: any,
        url: string
    },
    modalToken: boolean,
    revalidarToken: boolean,
    loading: boolean
}