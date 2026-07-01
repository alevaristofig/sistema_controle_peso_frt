import { all, takeEvery, put, call } from 'redux-saga/effects';
import { AnyAction } from 'redux-saga';

import { revalidarToken, listarSucesso, listarError, listarSemPaginacaoSucesso, listarSemPaginacaoError,
         salvarSucesso, salvarError, buscarSucesso, buscarError, atualizarSucesso, atualizarError } from './slice';

import axios, { AxiosResponse } from 'axios';
import { ISessaoExercicio } from '../../interfaces/sessao/sessao-exercicio.interface';
import { IExercicioResponse } from '../../interfaces/exercicio/exercicioresponse.interface';
import { authService } from '../../service/auth';
import { IExercicio } from '../../interfaces/exercicio/exercicio.interface';

const setUrl: ISessaoExercicio = {
    url: JSON.parse(sessionStorage.getItem('urls')!),
    listar: "listarexerciciospaginacao",
    listarexercicios: "listarexercicios",
    pessoa: JSON.parse(sessionStorage.getItem('dadosPessoa')!)
}

function* listar(action: AnyAction): Generator<any, void, AxiosResponse<IExercicioResponse>> {
    try {
        let url = authService.getUrls();
        let dadosPessoa = authService.getUser(); 

        const response: AxiosResponse<IExercicioResponse>= yield call(axios.get,`${url?.exercicios.href}/listarexerciciospaginacao/${dadosPessoa?.id}?page=${action.payload.page}`,{
                            headers: {
                                "Authorization": `Bearer ${authService.getToken()}` ,
                            }
        });

        let responseExercicio = {
            dados: response.data.page.totalElements === 0 ? [] : response.data._embedded.exercicioModelList,
            paginacao: response.data.page,
            links: response.data._links,
            url: 'exercicio'
        }

        yield put(listarSucesso(responseExercicio));
    } catch(error: any) {
        if(error.response.status === 401) {
            yield put(revalidarToken());
        } else {        
            yield put(listarError(error.response.data.userMessage));
        } 
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
    } catch(error: any) {   
        if(error.response.status === 401) {
            yield put(revalidarToken());
        } else {        
            yield put(listarSemPaginacaoError(error.response.data.userMessage));
        }     
    }    
}

function* buscar(action: AnyAction): Generator<any, void, AxiosResponse<IExercicio>> {
    try {
        let url = authService.getUrls();
        let dadosPessoa = authService.getUser(); 

        const response: AxiosResponse<IExercicio>= yield call(axios.get,`${url?.exercicios.href}/${action.payload.id}`,{
                            headers: {
                                "Authorization": `Bearer ${authService.getToken()}` ,
                            }
        });


        yield put(buscarSucesso(response.data));
    } catch(error: any) {
        if(error.response.status === 401) {
            yield put(revalidarToken());
        } else {        
            yield put(buscarError(error.response.data.userMessage));
        } 
    }    
}

function* salvar(action: AnyAction): Generator<any, void, AxiosResponse<void>> {
    try {

        let url = authService.getUrls();
        let dadosPessoa = authService.getUser(); 

        let dados = {
            'nome': action.payload.nome,
            'frequencia': action.payload.frequencia,
            'tempo': action.payload.tempo,
            'dataCadastro': action.payload.dataCadastro,
            'dataAtualizar': action.payload.dataAtualizar,
            'pessoa': {
                'id': dadosPessoa?.id
            }         
        }

        yield call(axios.post,`${url?.exercicios.href}`,dados,{
            headers: {
                "Authorization": `Bearer ${authService.getToken()}`
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

function* atualizar(action: AnyAction): Generator<any, void, AxiosResponse<void>> {
    try {

        let url = authService.getUrls();
        let dadosPessoa = authService.getUser(); 

        let dados = {
            'nome': action.payload.nome,
            'frequencia': action.payload.frequencia,
            'tempo': action.payload.tempo,
            'dataCadastro': action.payload.dataCadastro,
            'dataAtualizar': action.payload.dataAtualizar,
            'pessoa': {
                'id': dadosPessoa?.id
            }         
        }

        yield call(axios.put,`${url?.exercicios.href}/${action.payload.id}`,dados,{
            headers: {
                "Authorization": `Bearer ${authService.getToken()}`
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
    takeEvery('exercicio/listar', listar),
    takeEvery('exercicio/listarSemPaginacao', listarSemPaginacao),
    takeEvery('exercicio/buscar', buscar),
    takeEvery('exercicio/salvar', salvar),
    takeEvery('exercicio/atualizar', atualizar)
]);