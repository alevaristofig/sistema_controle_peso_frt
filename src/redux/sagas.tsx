import { all } from 'redux-saga/effects';

import peso from '../redux/peso/saga';
import pessoa from '../redux/pessoa/saga';
import exercicio from '../redux/exercicio/saga';
import treino from '../redux/treino/saga';
import alimento from '../redux/alimento/saga';
import dieta from '../redux/dieta/saga';

export default function* rootSaga() {
    yield all([
        peso,
        pessoa,
        exercicio,
        treino,
        alimento,
        dieta,
    ])
}