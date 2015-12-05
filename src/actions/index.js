import * as ActionTypes from '../constants/actions';

export function createGame(rules) {
  return { type: ActionTypes.CREATE_GAME, payload: rules };
}

export function loadSGF(sgf) {
  return { type: ActionTypes.LOAD_SGF, payload: sgf };
}

export function prevMove() {
  return { type: ActionTypes.PREV_MOVE };
}

export function nextMove() {
  return { type: ActionTypes.NEXT_MOVE };
}

export function firstMove() {
  return { type: ActionTypes.FIRST_MOVE };
}

export function lastMove() {
  return { type: ActionTypes.LAST_MOVE };
}

export function selectMove(move = 0) {
  return { type: ActionTypes.SELECT_MOVE, payload: move };
}

export function addMove(position, { x, y, color }) {
  return { type: ActionTypes.ADD_MOVE, payload: { x, y, color, position } };
}

export function addComment(position, comment) {
  return { type: ActionTypes.ADD_COMMENT, payload: { position, comment } };
}

export function addMarker(position, type, params) {
  return { type: ActionTypes.ADD_MARKER, payload: { position, type, params }};
}

export function setAppearance(options) {
  return { type: ActionTypes.SET_APPEARANCE, payload: options };
}

export function resetAppearance() {
  return { type: ActionTypes.RESET_APPEARANCE };
}
