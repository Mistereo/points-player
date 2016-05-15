import createReducer from '../utils/createReducer'

import {
  NEXT_MOVE,
  PREV_MOVE,
  FIRST_MOVE,
  LAST_MOVE,
  SELECT_MOVE,
} from '../constants/actions'


export const initialState = 0

export default createReducer(initialState, {
  [NEXT_MOVE]: (state, action, nodes) => {
    const { childs } = nodes[state]
    return childs[0] || state
  },
  [PREV_MOVE]: (state, action, nodes) => {
    const { parent } = nodes[state]
    return (typeof parent === 'number') ? parent : state
  },
  [FIRST_MOVE]: () => initialState,
  [LAST_MOVE]: (state, action, nodes) => {
    let id = state
    let current = nodes[id]
    while (current.childs.length) {
      id = current.childs[0]
      current = nodes[id]
    }
    return id
  },
  [SELECT_MOVE]: (state, action, nodes) => {
    const id = action.payload
    return nodes[id] ? id : state
  },
})
