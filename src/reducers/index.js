import { combineReducers } from 'redux';

import appearance from './appearance';
import player from './player';

const rootReducer = combineReducers({
  appearance,
  player,
});

export default rootReducer;
