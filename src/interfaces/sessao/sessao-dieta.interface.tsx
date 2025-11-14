import { IPessoa } from "../pessoa/pessoa.interface";

export interface ISessaoDieta {
    url: {dietas: { href: string} },
    url2: {alimentodieta: {href: string} },
    listar: string,
    pessoa: IPessoa,
}