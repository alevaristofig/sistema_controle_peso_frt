import { all, takeEvery, put, call } from 'redux-saga/effects';
import { AnyAction } from 'redux-saga';

import { listarSucesso, listarError } from './slice';

import axios, { AxiosResponse } from 'axios';

import { ISessaoDieta } from '../../interfaces/sessao/sessao-dieta.interface';
import { IDietaResponse } from '../../interfaces/dieta/dieta-response.interface';

const setUrl: ISessaoDieta = {
    url: JSON.parse(sessionStorage.getItem('urls')!),
    listar: "listar",
    pessoa: JSON.parse(sessionStorage.getItem('dadosPessoa')!),
}

function* listar(action: AnyAction): Generator<any, void, AxiosResponse<IDietaResponse>> {
    try {

        let urls = setUrl; 

        const response = yield call(axios.get,`${urls.url.dietas.href}/${urls.listar}/${urls.pessoa.id}?page=${action.payload.page}`,{
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}`
            }
        });
      
        let responseDieta = {
            dados: response.data.page.totalElements === 0 ? [] : response.data._embedded.dietaModelList,
            paginacao: response.data.page,
            links: response.data._links,
            url: 'treino'
        }
        
        yield put(listarSucesso(responseDieta));
    } catch(error) {            
        yield put(listarError());
    }
}

export default all([
    takeEvery('dieta/listar', listar),
]);