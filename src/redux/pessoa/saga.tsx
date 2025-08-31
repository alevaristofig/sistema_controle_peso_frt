import { all, takeEvery, put, call } from 'redux-saga/effects';
import { AnyAction } from 'redux-saga';

import { listarSucesso, listarError } from './slice';

import axios, { AxiosResponse } from 'axios';
import { ISessaoPessoa } from '../../interfaces/sessao/sessao-pessoa.interface';
import { IPessoa } from '../../interfaces/pessoa/pessoa.interface';

const setUrl: ISessaoPessoa = {
    url: JSON.parse(sessionStorage.getItem('urls')!),
    pessoa: JSON.parse(sessionStorage.getItem('dadosPessoa')!)
}

function* listar(): Generator<any, void, AxiosResponse<IPessoa[]>> {
    try {

        let urls = setUrl;   

        const response = yield call(axios.get,`${urls.url.pessoas.href}`);

        yield put(listarSucesso(response.data));
    } catch(error) {
        yield put(listarError());
    }
}

export default all([
    takeEvery('pessoa/listar', listar),
])