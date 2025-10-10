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

export default all([]);