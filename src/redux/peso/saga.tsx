import { all, takeEvery, put, call } from 'redux-saga/effects';
import { AnyAction } from 'redux-saga';

import axios, { AxiosResponse } from 'axios';

import { buscarPrimeiroPesoSucesso, buscarPrimeiroPesoError, buscarUltimoPesoSucesso, buscarUltimoPesoError,
         listarSucesso, listarError, apgarSucesso, apgarError } from './slice';

import { IPeso } from '../../interfaces/peso/peso.interface';
import { ISessaoPeso } from '../../interfaces/sessao/sessao-peso.interface';
import { IPesoState } from '../../interfaces/peso/pesostate.interface';
import { IPesoResponse } from '../../interfaces/peso/pesoresponse.interface';


const setUrl: ISessaoPeso = {
    url: JSON.parse(sessionStorage.getItem('urls')!),
    listar: "listar",
    primeiroPeso: "buscarprimeiropeso",
    ultimoPeso: "buscarultimopeso",
    pessoa: JSON.parse(sessionStorage.getItem('dadosPessoa')!)
}

function* listar(action: AnyAction): Generator<any, void, AxiosResponse<IPesoResponse>> {
    try {      
        let urls = setUrl;  
   
        const response: AxiosResponse<IPesoResponse> = yield call(axios.get,`${urls.url.pesos.href}/${urls.listar}/${urls.pessoa.id}?page=${action.payload.page}`,{
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}` ,
            }
        });
    
        let responsePeso = {
            dados: response.data.page.totalElements === 0 ? [] : response.data._embedded.pesoModelList,
            paginacao: response.data.page,
            links: response.data._links,
            url: 'peso'
        }
           
            yield put(listarSucesso(responsePeso));
        } catch(error) {            
            yield put(listarError());
        }
}

function* buscarPrimeiroPeso(action: AnyAction) {
    try {   

        let urls = setUrl; 

        const response: AxiosResponse<IPeso> = yield call(axios.get,`${urls.url.pesos.href}/${urls.primeiroPeso}/${urls.pessoa.id}`,{
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}` ,
            }
        });

        yield put(buscarPrimeiroPesoSucesso(response.data));
    } catch(error: any) {         
        yield put(buscarPrimeiroPesoError(error));
    }
}

function* buscarUltimoPeso(action: AnyAction) {
    try {   

        let urls = setUrl; 

        const response: AxiosResponse<IPeso> = yield call(axios.get,`${urls.url.pesos.href}/${urls.ultimoPeso}/${urls.pessoa.id}`,{
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}` ,
            }
        });

        yield put(buscarUltimoPesoSucesso(response.data));
    } catch(error: any) {         
        yield put(buscarUltimoPesoError(error));
    }
}

function* apagar(action: AnyAction): Generator<any, void, void> {
    try {

        let urls = setUrl;   

        yield call(axios.delete,`${urls.url.pesos.href}/${action.payload.id}`,{
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}` ,
            }
        });

        yield put(apgarSucesso());

    } catch(error) {
        yield put(apgarError());
    }
}

export default all([
    takeEvery('peso/buscarPrimeiroPeso', buscarPrimeiroPeso),
    takeEvery('peso/buscarUltimoPeso', buscarUltimoPeso),
    takeEvery('peso/listar',listar),
    takeEvery('peso/apagar',apagar),
])