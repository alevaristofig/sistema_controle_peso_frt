import { IPessoa } from "../pessoa/pessoa.interface";

export interface ISessaoTreino {
    url: {treinos: { href: string} },
    pessoa: IPessoa,
}