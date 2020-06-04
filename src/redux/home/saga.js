import { takeEvery, put, select } from 'redux-saga/effects';
import { REDUX_HOME_SAGA_ACTION } from '@redux/home/constants';
import { mockAction } from '@redux/home/action';

export function* testSaga() {
  const state = yield select();
  console.log('state', state);

  yield put(mockAction());
}

export default function* defaultSaga() {
  yield takeEvery(REDUX_HOME_SAGA_ACTION, testSaga);
}
