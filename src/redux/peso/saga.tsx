import { all, takeEvery, put, call } from 'redux-saga/effects';
import { AnyAction } from 'redux-saga';

import axios, { AxiosResponse } from 'axios';

import { buscarPrimeiroPesoSucesso, buscarPrimeiroPesoError } from './slice';

import { IPeso } from '../../interfaces/peso/peso.interface';
import { ISessao } from '../../interfaces/sessao.interface';
import { IPesoState } from '../../interfaces/peso/pesostate.interface';


const setUrl: ISessao = {
    url: JSON.parse(sessionStorage.getItem('urls')!),
    primeiroPeso: "buscarprimeiropeso",
    ultimoPeso: "buscarultimopeso",
    pessoa: JSON.parse(sessionStorage.getItem('dadosPessoa')!)
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

export default all([
    takeEvery('peso/buscarPrimeiroPeso', buscarPrimeiroPeso)
])