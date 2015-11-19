import SGF from 'sgfjs';

import createReducer from '../utils/createReducer';
import normalizeSGFTree from '../utils/normalizeSGFTree';
import { LOAD_SGF } from '../constants/actions';


export const initialState = {};

export default createReducer(initialState, {
  [LOAD_SGF]: (state, action) => {
    const sgf = action.payload;
    const parsed = SGF.parse(sgf);
    return normalizeSGFTree(parsed);
  },
});
