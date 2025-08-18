import { IPessoa } from "./pessoa/pessoa.interface"

export interface ISessao {
    url: {pesos: { href: string} }, 
    primeiroPeso: string,
    ultimoPeso: string
    pessoa: IPessoa
}