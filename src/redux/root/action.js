import {
  REDUX_ROOT_DUMP_ACTION,
  REDUX_ROOT_SAGA_ACTION,
} from '@redux/root/constants';

export const rootAction = () => ({
  type: REDUX_ROOT_DUMP_ACTION,
});

export const sagaAction = () => ({
  type: REDUX_ROOT_SAGA_ACTION,
});
