import { IPessoa } from "../pessoa/pessoa.interface";

export interface ISessaoAlimento {
    url: {alimentos: { href: string} },
    pessoa: IPessoa,
}