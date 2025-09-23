import { IPessoa } from "../pessoa/pessoa.interface";

export interface ISessaoTreino {
    url: {pessoaexercicio: { href: string} },
    pessoa: IPessoa,
}