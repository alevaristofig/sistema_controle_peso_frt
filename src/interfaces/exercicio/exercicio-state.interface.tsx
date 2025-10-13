import { IExercicio } from "./exercicio.interface"

export interface IExercicioState {
    exercicios: {
        dados: IExercicio [],
        paginacao: any,
        url: string
    },
    exerciciosSemPaginacao: Array<any>,
    modalToken: boolean,
    loading: boolean
}