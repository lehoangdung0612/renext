import {combineReducers} from 'redux';

// import data from './data';
import ui from './ui';

export default combineReducers({
  default: () => ({}),
  ui,
});