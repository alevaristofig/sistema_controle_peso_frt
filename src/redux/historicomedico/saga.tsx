import { all, takeEvery, put, call } from 'redux-saga/effects';
import { AnyAction } from 'redux-saga';

import { revalidarToken, listarSucesso, listarError, salvarSucesso, salvarError } from './slice';

import axios, { AxiosResponse } from 'axios';
import { ISessaoHistoricoMedico } from '../../interfaces/sessao/sessao-historicomedico.interface';
import { IHistoricoMedicoResponse } from '../../interfaces/historicomedico/historicomedico-response.interface';

const setUrl: ISessaoHistoricoMedico = {
    url: JSON.parse(sessionStorage.getItem('urls')!),
    listar: "listarhistoricomedicopaginacao",
    pessoa: JSON.parse(sessionStorage.getItem('dadosPessoa')!)
}

function* listar(action: AnyAction): Generator<any, void, AxiosResponse<IHistoricoMedicoResponse>> {
    try {
        let urls = setUrl;  

        const response: AxiosResponse<IHistoricoMedicoResponse>= yield call(axios.get,`${urls.url.historicomedico.href}/${urls.listar}/${urls.pessoa.id}?page=${action.payload.page}`,{
                            headers: {
                                "Authorization": `Bearer ${sessionStorage.getItem('token')}` ,
                            }
        });

        let responseHistoricoMedico = {
            dados: response.data.page.totalElements === 0 ? [] : response.data._embedded.historicoMedicoModelList,
            paginacao: response.data.page,
            links: response.data._links,
            url: 'historicomedico'
        }

        yield put(listarSucesso(responseHistoricoMedico));
    } catch(error: any) {        
        if(error.response.status === 401) {            
            yield put(revalidarToken());
        } else {
            yield put(listarError(error.response.data.userMessage));
        }        
    }    
}

function* salvar(action: AnyAction): Generator<any, void, AxiosResponse<IHistoricoMedicoResponse>> {
    try {

        let urls = setUrl;

        let dados = {
            descricao: action.payload.descricao,
            remedio: action.payload.remedio,
            dataCadastro: action.payload.dataCadastro,
            dataAtualizacao: action.payload.dataAtualizacao

        };

        yield call(axios.post,`${urls.url.historicomedico.href}`,dados,{
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

export default all([
    takeEvery('historicomedico/listar', listar),
    takeEvery('historicomedico/salvar', salvar),
]);