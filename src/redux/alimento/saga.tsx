import { all, takeEvery, put, call } from 'redux-saga/effects';
import { AnyAction } from 'redux-saga';

import { listarSucesso, listarError } from './slice';

import axios, { AxiosResponse } from 'axios';
import { ISessaoAlimento } from '../../interfaces/sessao/sessao-alimento.interface';

const setUrl: ISessaoAlimento = {
    url: JSON.parse(sessionStorage.getItem('urls')!),
    pessoa: JSON.parse(sessionStorage.getItem('dadosPessoa')!),
}

export default all([]);
