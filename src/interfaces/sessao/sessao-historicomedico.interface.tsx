import { IPessoa } from "../pessoa/pessoa.interface";

export interface ISessaoHistoricoMedico {
    url: {historicomedico: { href: string} },
    pessoa: IPessoa,
    listar: string,
}