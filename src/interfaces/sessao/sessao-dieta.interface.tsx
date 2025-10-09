import { IPessoa } from "../pessoa/pessoa.interface";

export interface ISessaoDieta {
    url: {dietas: { href: string} },
    listar: string,
    pessoa: IPessoa,
}