import { IPessoaId } from "../pessoa/pessoa-id.interface";

export interface IDieta {
    id: number,
    nome: string,
    dataCadastro: Date,
    dataAtualizacao: Date,
    pessoa: IPessoaId
}