import { IExercicio } from "../exercicio/exercicio.interface";
import { ILink } from "../link/link.interface";

export interface ITreino {
    /*quantidade: number,
    exercicoId: number,
    pessaoId: number,
    nome:string*/
    data: Date,
    exercicio: IExercicio,
    id: number,
    pessoaId: number,
    treino: string,
    _links: ILink
}