import { IPessoa } from "./pessoa.interface"

export interface IPessoaState {
    pessoas: {
        dados: IPessoa []
    },
    modalToken: boolean,
    loading: boolean
}