import { ITreino } from './treino.interface';

export interface ITreinoState {
    treinos: ITreino[],
    loading: boolean
}