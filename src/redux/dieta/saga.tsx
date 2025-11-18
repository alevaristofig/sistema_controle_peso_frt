import { all, takeEvery, put, call } from 'redux-saga/effects';
import { AnyAction } from 'redux-saga';

import { revalidarToken, listarSucesso, listarError, salvarSucesso, salvarError, salvarDietaAlimentoSucesso,
         salvarDietaAlimentoError } from './slice';

import axios, { AxiosResponse } from 'axios';

import { ISessaoDieta } from '../../interfaces/sessao/sessao-dieta.interface';
import { IDietaResponse } from '../../interfaces/dieta/dieta-response.interface';

const setUrl: ISessaoDieta = {
    url: JSON.parse(sessionStorage.getItem('urls')!),
    url2: JSON.parse(sessionStorage.getItem('urls')!),
    listar: "listaralimentospaginacao",
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
            url: 'dieta'
        }
        
        yield put(listarSucesso(responseDieta));
    } catch(error: any) {            
        if(error.response.status === 401) {
            yield put(revalidarToken());
        } else {        
            yield put(listarError(error.response.data.userMessage));
        } 
    }
}

function* salvar(action: AnyAction): Generator<any, void, AxiosResponse<IDietaResponse>> {
    try {

        let urls = setUrl;
alert('entrou')
        let dados = {
            'dietaId': {
                'id': action.payload.dietaId
            },
            'alimentoId': {
                'id': action.payload.alimentoId
            },
            'dataCadastro': action.payload.dataCadastro,
            'dataAtualizacao': action.payload.dataAtualizacao
        };

        yield call(axios.post,`${urls.url.dietas.href}`,dados,{
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}`
            }
        });              

        yield put(salvarSucesso());
    } catch(error: any) {            
        if(error.response.status === 401) {
            yield put(revalidarToken());
        } else {        
            yield put(salvarError(error.response.data.userMessage));
        } 
    }
}

function* salvarDietaAlimento(action: AnyAction) {
    try {

        let urls = setUrl;

        let dados = {
            'dietaId': {
                'id': action.payload.dietaId
            },
            'alimentoId': {
                'id': action.payload.alimentoId
            },
            'dataCadastro': action.payload.dataCadastro,
            'dataAtualizacao': action.payload.dataAtualizacao
        };

        yield call(axios.post,`${urls.url2.alimentodieta.href}`,dados,{
                    headers: {
                        "Authorization": `Bearer ${sessionStorage.getItem('token')}` 
                    }
        });
    } catch(error: any) {
        if(error.response.status === 401) {
            yield put(revalidarToken());
        } else {        
            yield put(salvarDietaAlimentoError(error.response.data.userMessage));
        } 
    }
}

export default all([
    takeEvery('dieta/listar', listar),
    takeEvery('dieta/salvar', salvar),
    takeEvery('dieta/salvarDietaAlimento', salvarDietaAlimento),
]);