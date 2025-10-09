import { all, takeEvery, put, call } from 'redux-saga/effects';
import { AnyAction } from 'redux-saga';

import axios, { AxiosResponse } from 'axios';
import { ISessaoDieta } from '../../interfaces/sessao/sessao-dieta.interface';

const setUrl: ISessaoDieta = {
    url: JSON.parse(sessionStorage.getItem('urls')!),
    listar: "listar",
    pessoa: JSON.parse(sessionStorage.getItem('dadosPessoa')!),
}

export default all([]);