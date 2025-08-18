import { all } from 'redux-saga/effects';

import peso from '../redux/peso/saga';

export default function* rootSaga() {
    yield all([
        peso
    ])
}