import { IPessoa } from "../pessoa/pessoa.interface"

export interface ISessaoPessoa {
    url: {pessoas: { href: string} },
    pessoa: IPessoa,
}