import dynostore, { dynamicReducers } from '@redux-dynostore/core';
import { dynamicSagas } from '@redux-dynostore/redux-saga';
import rootSaga from '@redux/root/saga';
import { applyMiddleware, compose, createStore } from 'redux';
import Offline from './offline';
import Reducer from './reducer';
import Saga from './saga';

const middleware = applyMiddleware(Saga, Offline.offlineMiddleware);
const enhancer = [
  middleware,
  dynostore(dynamicReducers(), dynamicSagas(Saga)),
  Offline.enhanceStore,
];

if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  enhancer.push(window.__REDUX_DEVTOOLS_EXTENSION__());
}

const store = createStore(
  Offline.enhanceReducer(Reducer),
  {},
  compose(...enhancer),
);

Saga.run(rootSaga);

export default store;
