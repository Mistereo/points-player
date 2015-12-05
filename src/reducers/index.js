import { combineReducers } from 'redux';

import appearance from './appearance';
import game from './game';

const rootReducer = combineReducers({
  appearance,
  game,
});

export default rootReducer;
