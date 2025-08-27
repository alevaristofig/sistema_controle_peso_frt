import { IAlimento } from "../alimento/alimento.interface";
import { IDieta } from "../dieta/dieta.interface";
import { IExercicio } from "../exercicio/exercicio.interface";
import { IHistoricoMedico } from "../historicomedico/historicomedico.interface";

export interface IDadosPessoaToken {
    id: number,
    nome: string,
    email: string,
    endereco: string,
    altura: number,
    senha: string,
    dataCadastro: Date,
    dataAtualizacao: Date,
    historicoMedico: IHistoricoMedico,
    alimento: IAlimento,
    dieta: IDieta,
    exercicio: IExercicio
}