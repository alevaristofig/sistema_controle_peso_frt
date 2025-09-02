import { IPessoa } from "./pessoa.interface"

export interface IPessoaResponse {
  _embedded: {
    pessoaModelList: IPessoa[]
  }
}