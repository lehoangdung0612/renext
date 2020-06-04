import { takeEvery, put } from 'redux-saga/effects';
import { REDUX_ROOT_SAGA_ACTION } from '@redux/root/constants';
import { mockAction } from '@redux/root/action';

export function* testSaga() {
  yield put(mockAction());
}

export default function* defaultSaga() {
  yield takeEvery(REDUX_ROOT_SAGA_ACTION, testSaga);
}
