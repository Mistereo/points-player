import expect from 'expect';

import cursor, { initialState } from '../../src/reducers/cursor';
import {
  NEXT_MOVE,
  PREV_MOVE,
  FIRST_MOVE,
  LAST_MOVE,
  SELECT_MOVE
} from '../../src/constants/actions';

const nodes = {
  0: { childs: [1, 2] },
  1: { parent: 0, childs: [3] },
  2: { parent: 0, childs: [] },
  3: { parent: 1, childs: [] },
}

describe('cursor reducer', () => {
  it('should handle initial state', () => {
    expect(cursor(undefined, {})).toEqual(initialState)
  })

  it('should handle NEXT_MOVE', () => {
    const action = { type: NEXT_MOVE }
    expect(cursor(0, action, nodes)).toEqual(1)
    expect(cursor(1, action, nodes)).toEqual(3)
    expect(cursor(3, action, nodes)).toEqual(3)
  })

  it('should handle PREV_MOVE', () => {
    const action = { type: PREV_MOVE };
    expect(cursor(0, action, nodes)).toEqual(0)
    expect(cursor(1, action, nodes)).toEqual(0)
    expect(cursor(3, action, nodes)).toEqual(1)
  })

  it('should handle FIRST_MOVE', () => {
    const action = { type: FIRST_MOVE };
    expect(cursor(0, action, nodes)).toEqual(0)
    expect(cursor(1, action, nodes)).toEqual(0)
    expect(cursor(3, action, nodes)).toEqual(0)
  })

  it('should handle LAST_MOVE', () => {
    const action = { type: LAST_MOVE };
    expect(cursor(0, action, nodes)).toEqual(3)
    expect(cursor(1, action, nodes)).toEqual(3)
    expect(cursor(2, action, nodes)).toEqual(2)
    expect(cursor(3, action, nodes)).toEqual(3)
  })

  it('should handle SELECT_MOVE', () => {
    expect(cursor(0, { type: SELECT_MOVE, payload: 0 }, nodes)).toEqual(0)
    expect(cursor(0, { type: SELECT_MOVE, payload: 1 }, nodes)).toEqual(1)
    expect(cursor(0, { type: SELECT_MOVE, payload: 2 }, nodes)).toEqual(2)
    expect(cursor(0, { type: SELECT_MOVE, payload: 3 }, nodes)).toEqual(3)
  })
});
