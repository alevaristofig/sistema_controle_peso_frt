import { all, takeEvery, put, call } from 'redux-saga/effects';
import { AnyAction } from 'redux-saga';

import { listarSucesso, listarError, atualizarSucesso, atualizarError } from './slice';

import axios, { AxiosResponse } from 'axios';

import { ISessaoPessoa } from '../../interfaces/sessao/sessao-pessoa.interface';
import { IPessoa } from '../../interfaces/pessoa/pessoa.interface';
import { IPessoaResponse } from '../../interfaces/pessoa/pessoaresponse.interface';

const setUrl: ISessaoPessoa = {
    url: JSON.parse(sessionStorage.getItem('urls')!),
    pessoa: JSON.parse(sessionStorage.getItem('dadosPessoa')!)
}

function* listar(): Generator<any, void, AxiosResponse<IPessoaResponse>> {
    try {

        let urls = setUrl;   

        const response = yield call(axios.get,`${urls.url.pessoas.href}`,{
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}`
            }
        });

        yield put(listarSucesso(response.data._embedded.pessoaModelList));
    } catch(error) {
        yield put(listarError());
    }
}

function* atualizar(action: AnyAction): Generator<any, void, AxiosResponse<void>> {
    try {
        let data = {
            'nome': action.payload.nome,
            'email': action.payload.email,
            'altura': action.payload.altura,
            'endereco': action.payload.endereco,
            'senha': action.payload.senha,
            'dataCadastro': action.payload.dataCadastro,
            'dataAtualizacao': action.payload.dataAtualizacao
        };

        let urls = setUrl;  

        yield call(axios.put,`${urls.url.pessoas.href}/${action.payload.pessoa}`,data,{
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}` ,
            }
        });

        yield put(atualizarSucesso());
    } catch(error: any) {
        yield put(atualizarError(error.response.data.userMessage));
    }
}

export default all([
    takeEvery('pessoa/listar', listar),
    takeEvery('pessoa/atualizar', atualizar),
])