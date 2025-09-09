import { IPessoa } from "../pessoa/pessoa.interface"

export interface ISessaoPeso {
    url: {pesos: { href: string} },
    pessoa: IPessoa,
    listar: string,
    primeiroPeso: string,
    ultimoPeso: string,
}