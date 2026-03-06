import { all, takeEvery, put, call } from 'redux-saga/effects';
import { AnyAction } from 'redux-saga';

import { revalidarToken, listarSucesso, listarError, salvarSucesso, salvarError, listarSemPaginacaoSucesso,
         listarSemPaginacaoError, atualizarSucesso, atualizarError } from './slice';

import axios, { AxiosResponse } from 'axios';
import { ISessaoAlimento } from '../../interfaces/sessao/sessao-alimento.interface';
import { IAlimentoResponse } from '../../interfaces/alimento/alimento-response.interface';
import { IAlimento } from '../../interfaces/alimento/alimento.interface';

const setUrl: ISessaoAlimento = {
    url: JSON.parse(sessionStorage.getItem('urls')!),
    listar: "listaralimentospaginacao",
    listarsempaginacao: "listaralimentossempaginacao",
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
    } catch(error: any) {          
        if(error.response.status === 401) {            
            yield put(revalidarToken());
        } else {        
            yield put(listarError(error.response.data.userMessage));
        }                 
    }
}

function* listarSemPaginacao(): Generator<any, void, AxiosResponse<IAlimentoResponse>> {
    try {

        let urls = setUrl; 

        const response = yield call(axios.get,`${urls.url.alimentos.href}/${urls.listarsempaginacao}`,{
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}`
            }
        });

        yield put(listarSemPaginacaoSucesso(response.data));
    } catch(error: any) {               
        if(error.response.status === 401) {
            yield put(revalidarToken());
        } else {        
            yield put(listarSemPaginacaoError(error.response.data.userMessage));
        }                 
    }
}

function* salvar(action: AnyAction): Generator<any, void, AxiosResponse<void>> {
    try {

        let urls = setUrl; 

        let dados = {
            'nome': action.payload.nome,
            'quantidade': action.payload.quantidade,
            'calorias': action.payload.calorias,  
            'pessoa': {
                'id': urls.pessoa.id
            }          
        }

        yield call(axios.post,`${urls.url.alimentos.href}`,dados,{
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

function* atualizar(action: AnyAction): Generator<any, void, AxiosResponse<IAlimento>> {
    try {

        let urls = setUrl; 

        let dados = {
            'nome': action.payload.nome,
            'quantidade': action.payload.quantidade,
            'calorias': action.payload.calorias,  
            'pessoa': {
                'id': urls.pessoa.id
            }          
        }

        yield call(axios.put,`${urls.url.alimentos.href}/${action.payload.id}`,dados,{
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}`
            }
        });

        yield put(atualizarSucesso());

    } catch(error: any) {               
        if(error.response.status === 401) {
            yield put(revalidarToken());
        } else {        
            yield put(atualizarError(error.response.data.userMessage));
        }                 
    }
}

export default all([
    takeEvery('alimento/listar', listar),
    takeEvery('alimento/salvar', salvar),
    takeEvery('alimento/listarSemPaginacao', listarSemPaginacao),
    takeEvery('alimento/atualizar', atualizar),
]);
