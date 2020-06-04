import {
  REDUX_HOME_DUMP_ACTION,
  REDUX_HOME_SAGA_ACTION,
} from '@redux/home/constants';

export const mockAction = () => ({
  type: REDUX_HOME_DUMP_ACTION,
});

export const sagaAction = () => ({
  type: REDUX_HOME_SAGA_ACTION,
});
