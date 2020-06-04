import { REDUX_HOME_DUMP_ACTION } from '@redux/home/constants';
import { UtilLib } from '@lib/index';

export const initialState = {
  count: 0,
};

export function homeReducer(state = initialState, action) {
  switch (action.type) {
    case REDUX_HOME_DUMP_ACTION:
      const currentCount = state.count;
      return UtilLib.setIn(state, 'count', currentCount + 1);

    default:
      return state;
  }
}
