import { IPessoa } from "../pessoa/pessoa.interface";

export interface ISessaoAlimento {
    url: {alimentos: { href: string} },
    listar: string,
    pessoa: IPessoa,
}