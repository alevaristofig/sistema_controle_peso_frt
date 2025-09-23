import { all, takeEvery, put, call } from 'redux-saga/effects';
import { AnyAction } from 'redux-saga';

import { listarSucesso, listarError } from './slice';

import axios, { AxiosResponse } from 'axios';

import { ISessaoTreino } from '../../interfaces/sessao/sessao-treino.interface';
import { ITreinoResponse } from '../../interfaces/treino/treino-response.interface';

const setUrl: ISessaoTreino = {
    url: JSON.parse(sessionStorage.getItem('urls')!),
    pessoa: JSON.parse(sessionStorage.getItem('dadosPessoa')!),
}

function* listar(action: AnyAction): Generator<any, void, AxiosResponse<ITreinoResponse>> {
    try {

        let urls = setUrl;   

        const response = yield call(axios.get,`${urls.url.pessoaexercicio.href}/${urls.pessoa.id}?page=${action.payload.page}`,{
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}`
            }
        });

        yield put(listarSucesso(response.data._embedded.pessoaExercicioModelList));
    } catch(error) {
        yield put(listarError());
    }
}

export default all([
    takeEvery('treino/listar', listar),
])