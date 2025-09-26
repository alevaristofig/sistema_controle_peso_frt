import { all, takeEvery, put, call } from 'redux-saga/effects';
import { AnyAction } from 'redux-saga';

import { listarSucesso, listarError, listarSemPaginacaoSucesso, listarSemPaginacaoError } from './slice';

import axios, { AxiosResponse } from 'axios';
import { ISessaoPessoa } from '../../interfaces/sessao/sessao-pessoa.interface';
import { ISessaoExercicio } from '../../interfaces/sessao/sessao-exercicio.interface';
import { IExercicioResponse } from '../../interfaces/exercicio/exercicioresponse.interface';

const setUrl: ISessaoExercicio = {
    url: JSON.parse(sessionStorage.getItem('urls')!),
    listar: "listarexerciciospaginacao",
    listarexercicios: "listarexercicios",
    pessoa: JSON.parse(sessionStorage.getItem('dadosPessoa')!)
}

function* listar(action: AnyAction): Generator<any, void, AxiosResponse<IExercicioResponse>> {
    try {
        let urls = setUrl;  

        const response: AxiosResponse<IExercicioResponse>= yield call(axios.get,`${urls.url.exercicios.href}/${urls.listar}/${urls.pessoa.id}?page=${action.payload.page}`,{
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

function* listarSemPaginacao() {
    try {

        let urls = setUrl; 

        const response: AxiosResponse<IExercicioResponse>= yield call(axios.get,`${urls.url.exercicios.href}/${urls.listarexercicios}/${urls.pessoa.id}`,{
                            headers: {
                                "Authorization": `Bearer ${sessionStorage.getItem('token')}` ,
                            }
        });

        yield put(listarSemPaginacaoSucesso(response.data))
    } catch(error) {       
        yield put(listarSemPaginacaoError());
    }
    
}

export default all([
    takeEvery('exercicio/listar', listar),
    takeEvery('exercicio/listarSemPaginacao', listarSemPaginacao),
]);