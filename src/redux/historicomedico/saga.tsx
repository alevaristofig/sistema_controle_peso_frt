import { all, takeEvery, put, call } from 'redux-saga/effects';
import { AnyAction } from 'redux-saga';

import { listarSucesso, listarError } from './slice';

import axios, { AxiosResponse } from 'axios';
import { ISessaoHistoricoMedico } from '../../interfaces/sessao/sessao-historicomedico.interface';

const setUrl: ISessaoHistoricoMedico = {
    url: JSON.parse(sessionStorage.getItem('urls')!),
    listar: "listarexerciciospaginacao",
    pessoa: JSON.parse(sessionStorage.getItem('dadosPessoa')!)
}

function* listar(action: AnyAction): Generator<any, void, AxiosResponse<IExercicioResponse>> {
    try {
        let urls = setUrl;  

        const response: AxiosResponse<IExercicioResponse>= yield call(axios.get,`${urls.url.historicomedico.href}/${urls.listar}/${urls.pessoa.id}?page=${action.payload.page}`,{
                            headers: {
                                "Authorization": `Bearer ${sessionStorage.getItem('token')}` ,
                            }
        });

        let responseHistoricoMedico = {
            dados: response.data.page.totalElements === 0 ? [] : response.data._embedded.exercicioModelList,
            paginacao: response.data.page,
            links: response.data._links,
            url: 'historicomedico'
        }

        yield put(listarSucesso(responseHistoricoMedico));
    } catch(erro: any) {
        yield put(listarError());
    }    
}

export default all([]);