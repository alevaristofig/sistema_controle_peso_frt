import { all, takeEvery, put, call } from 'redux-saga/effects';
import { AnyAction } from 'redux-saga';

import axios, { AxiosResponse } from 'axios';
import { ISessaoTreino } from '../../interfaces/sessao/sessao-treino.interface';

const setUrl: ISessaoTreino = {
    url: JSON.parse(sessionStorage.getItem('urls')!),
    pessoa: JSON.parse(sessionStorage.getItem('dadosPessoa')!),
}

export default all([
])