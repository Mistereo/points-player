import { createAction } from 'redux-act'

export const createGame = createAction('CREATE_GAME')
export const loadSGF = createAction('LOAD_SGF')

export const prevMove = createAction('PREV_MOVE')
export const nextMove = createAction('NEXT_MOVE')
export const firstMove = createAction('FIRST_MOVE')
export const lastMove = createAction('LAST_MOVE')
export const selectMove = createAction('SELECT_MOVE')

export const addMove = createAction(
  'ADD_MOVE',
  (position, { x, y, color }) => ({ x, y, color, position })
)
export const addComment = createAction(
  'ADD_COMMENT',
  (position, comment) => ({ position, comment })
)
export const addMarker = createAction(
  'ADD_MARKER',
  (position, type, params) => ({ position, type, params })
)

export const setAppearance = createAction('SET_APPEARANCE')
export const resetAppearance = createAction('RESET_APPEARANCE')
