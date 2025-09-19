import { IPessoa } from "../pessoa/pessoa.interface";

export interface ISessaoExercicio {
    url: {exercicios: { href: string} },
    pessoa: IPessoa,
    listar: string,
}