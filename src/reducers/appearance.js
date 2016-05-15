import createReducer from '../utils/createReducer'
import {
  setAppearance,
  resetAppearance,
} from '../actions'


export const initialState = {
  emptyColor: '#AAAAAA',
  blueColor: '#4169E1',
  redColor: '#DC143C',
  gridColor: '#CCCCCC',

  pointRadius: 5,
  margin: 10,
  width: 30,
  height: 30,
  cellSize: 18,

  alpha: 0.6,
  lineWidth: 1,
  borderWidth: 0,

  nodeSize: 22,
}

export default createReducer(initialState, {
  [setAppearance]: (state, { payload }) => ({
    ...state,
    ...payload,
  }),
  [resetAppearance]: () => initialState,
})
