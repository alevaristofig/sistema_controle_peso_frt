import { all, takeEvery, put, call } from 'redux-saga/effects';
import { AnyAction } from 'redux-saga';

import { listarSucesso, listarError } from './slice';

import axios, { AxiosResponse } from 'axios';
import { ISessaoAlimento } from '../../interfaces/sessao/sessao-alimento.interface';
import { IAlimentoResponse } from '../../interfaces/alimento/alimento-response.interface';

const setUrl: ISessaoAlimento = {
    url: JSON.parse(sessionStorage.getItem('urls')!),
    listar: "listaralimentospaginacao",
    pessoa: JSON.parse(sessionStorage.getItem('dadosPessoa')!),
}

function* listar(action: AnyAction): Generator<any, void, AxiosResponse<IAlimentoResponse>> {
    try {

        let urls = setUrl; 

        const response = yield call(axios.get,`${urls.url.alimentos.href}/${urls.listar}/${urls.pessoa.id}?page=${action.payload.page}`,{
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}`
            }
        });

        let responseAlimento = {
            dados: response.data.page.totalElements === 0 ? [] : response.data._embedded.alimentoModelList,
            paginacao: response.data.page,
            links: response.data._links,
            url: 'treino'
        }
        
                yield put(listarSucesso(responseAlimento));
    } catch(error) {            
        yield put(listarError());
    }
}

export default all([
    takeEvery('alimento/listar', listar),
]);
