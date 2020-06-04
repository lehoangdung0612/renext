import dynamic from '@redux-dynostore/react-redux';
import { attachReducer, dispatchAction } from '@redux-dynostore/core';
import { runSaga } from '@redux-dynostore/redux-saga';
import { homeReducer } from './reducer';
import saga from './saga';
import { mockAction } from '@redux/home/action';

const getModule = ({ identifier }) =>
  dynamic(
    identifier,
    attachReducer(homeReducer),
    runSaga(saga),
    dispatchAction(mockAction()),
  );

export default getModule;
