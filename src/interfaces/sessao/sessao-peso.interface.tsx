import { IPessoa } from "../pessoa/pessoa.interface"

export interface ISessaoPeso {
    url: {pesos: { href: string} },
    pessoa: IPessoa,
    primeiroPeso: string,
    ultimoPeso: string
}