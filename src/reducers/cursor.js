import createReducer from '../utils/createReducer'

import {
  prevMove,
  nextMove,
  firstMove,
  lastMove,
  selectMove,
} from '../actions'


export const initialState = 0

export default createReducer(initialState, {
  [nextMove]: (state, action, nodes) => {
    const { childs } = nodes[state]
    return childs[0] || state
  },
  [prevMove]: (state, action, nodes) => {
    const { parent } = nodes[state]
    return (typeof parent === 'number') ? parent : state
  },
  [firstMove]: () => initialState,
  [lastMove]: (state, action, nodes) => {
    let id = state
    let current = nodes[id]
    while (current.childs.length) {
      id = current.childs[0]
      current = nodes[id]
    }
    return id
  },
  [selectMove]: (state, action, nodes) => {
    const id = action.payload
    return nodes[id] ? id : state
  },
})
