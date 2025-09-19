import { all, takeEvery, put, call } from 'redux-saga/effects';
import { AnyAction } from 'redux-saga';

import { listarSucesso, listarError } from './slice';

import axios, { AxiosResponse } from 'axios';
import { ISessaoPessoa } from '../../interfaces/sessao/sessao-pessoa.interface';
import { ISessaoExercicio } from '../../interfaces/sessao/sessao-exercicio.interface';

const setUrl: ISessaoExercicio = {
    url: JSON.parse(sessionStorage.getItem('urls')!),
    listar: "listar",
    pessoa: JSON.parse(sessionStorage.getItem('dadosPessoa')!)
}

function* listar(action: AnyAction) {
    try {
        let urls = setUrl;  

        const response: AxiosResponse<any >= yield call(axios.get,`${urls.url.exercicios.href}/${urls.listar}/${urls.pessoa.id}?page=${action.payload.page}`,{
                            headers: {
                                "Authorization": `Bearer ${sessionStorage.getItem('token')}` ,
                            }
                        });

        let responseExercicio = {
            dados: response.data.page.totalElements === 0 ? [] : response.data._embedded.exercicioModelList,
            paginacao: response.data.page,
            links: response.data._links,
            url: 'exercicio'
        }

        yield put(listarSucesso(responseExercicio));
    } catch(erro: any) {
        yield put(listarError());
    }    
}

export default all([

]);