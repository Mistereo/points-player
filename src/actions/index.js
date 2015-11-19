import {
  NEXT_MOVE,
  PREV_MOVE,
  FIRST_MOVE,
  LAST_MOVE,
  SELECT_MOVE,
  LOAD_SGF,
  SET_APPEARANCE,
  RESET_APPEARANCE } from '../constants/actions';

export function loadSGF(sgf) {
  return { type: LOAD_SGF, payload: sgf };
}

export function nextMove() {
  return { type: NEXT_MOVE };
}

export function prevMove() {
  return { type: PREV_MOVE };
}

export function firstMove() {
  return { type: FIRST_MOVE };
}

export function lastMove() {
  return { type: LAST_MOVE };
}

export function selectMove(move = 0) {
  return { type: SELECT_MOVE, payload: move };
}

export function setAppearance(options) {
  return { type: SET_APPEARANCE, payload: options };
}

export function resetAppearance() {
  return { type: RESET_APPEARANCE };
}
