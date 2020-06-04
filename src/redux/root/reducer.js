import { REDUX_ROOT_DUMP_ACTION } from '@redux/root/constants';
import _ from 'lodash';
import { UtilLib } from '@lib/index';

export const initialState = {
  count: 0,
  root: true,
};

export function rootReducer(state = initialState, action) {
  switch (action.type) {
    case REDUX_ROOT_DUMP_ACTION:
      const currentCount = state.count;
      return UtilLib.setIn(state, ['count'], currentCount + 1);

    default:
      return state;
  }
}
