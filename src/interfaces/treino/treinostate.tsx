import { ITreino } from './treino.interface';

export interface ITreinoState {
    treinos: {
        dados: ITreino [],
        paginacao: any,
        url: string
    },   
    loading: boolean
}