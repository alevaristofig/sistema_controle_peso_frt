import { all, takeEvery, put, call } from 'redux-saga/effects';
import { AnyAction } from 'redux-saga';
import axios, { AxiosResponse } from 'axios';

import { revalidarToken, buscarSucesso, buscarError } from './slice';

import { authService } from '../../service/auth';
import { IAlimentoDietaResponse } from '../../interfaces/alimentoDieta/alimentodieta-response.interface';

function* buscar(action: AnyAction): Generator<any, void, AxiosResponse<IAlimentoDietaResponse>> {
    try {      
        let url = authService.getUrls();        
   
        const response: AxiosResponse<IAlimentoDietaResponse> = yield call(axios.get,`${url?.alimentodieta.href}/${action.payload.id}`,{
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



export default all([
    takeEvery('alimentodieta/buscar', buscar),
]);