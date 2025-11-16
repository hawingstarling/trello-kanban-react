import { all } from 'redux-saga/effects';
import { listSaga } from './list-saga';
import { cardSaga } from './card-saga';

export default function* rootSaga() {
  yield all([listSaga(), cardSaga()]);
}
