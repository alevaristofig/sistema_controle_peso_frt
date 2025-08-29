import { IPessoa } from "./pessoa.interface"

export interface IPessoaState {
    pessoas: {
        dados: IPessoa []
    },
    loading: boolean
}