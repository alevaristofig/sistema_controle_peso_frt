import { IPessoaId } from "../pessoa/pessoa-id.interface";

export interface IDieta {
    nome: string,
    dataCadastro: Date | string,
    dataAtualizacao: Date | null,
    pessoa: IPessoaId
}