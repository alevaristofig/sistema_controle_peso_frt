import { all, takeEvery, put, call } from 'redux-saga/effects';
import { AnyAction } from 'redux-saga';

import { listarSucesso, listarError } from './slice';

import axios, { AxiosResponse } from 'axios';

const setUrl: ISessao = {
    url: JSON.parse(sessionStorage.getItem('urls')!),
    pessoa: JSON.parse(sessionStorage.getItem('dadosPessoa')!)
}

function* listar() {
    try {

        let urls = yield call(setUrl);  

        const response = yield call(axios.get,`${urls.url.pessoas.href}`);

        yield put(listarSucesso(response.data));
    } catch(error) {
        yield put(listarError());
    }
}

export default all([])