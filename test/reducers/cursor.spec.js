import expect from 'expect'

import cursor, { initialState } from '../../src/reducers/cursor'
import {
  prevMove,
  nextMove,
  firstMove,
  lastMove,
  selectMove,
} from '../../src/actions'

const tree = {
  0: { id: 0, childs: [1, 2] },
  1: { id: 1, parent: 0, childs: [3] },
  2: { id: 2, parent: 0, childs: [] },
  3: { id: 3, parent: 1, childs: [] },
}

describe('cursor reducer', () => {
  it('should handle initial state', () => {
    expect(cursor(undefined, {})).toEqual(initialState)
  })

  it('should handle PREV_MOVE', () => {
    const action = prevMove()
    expect(cursor(0, action, tree)).toEqual(0)
    expect(cursor(1, action, tree)).toEqual(0)
    expect(cursor(2, action, tree)).toEqual(0)
    expect(cursor(3, action, tree)).toEqual(1)
  })

  it('should handle NEXT_MOVE', () => {
    const action = nextMove()
    expect(cursor(0, action, tree)).toEqual(1)
    expect(cursor(1, action, tree)).toEqual(3)
    expect(cursor(2, action, tree)).toEqual(2)
    expect(cursor(3, action, tree)).toEqual(3)
  })

  it('should handle FIRST_MOVE', () => {
    const action = firstMove()
    expect(cursor(0, action, tree)).toEqual(0)
    expect(cursor(1, action, tree)).toEqual(0)
    expect(cursor(2, action, tree)).toEqual(0)
    expect(cursor(3, action, tree)).toEqual(0)
  })

  it('should handle LAST_MOVE', () => {
    const action = lastMove()
    expect(cursor(0, action, tree)).toEqual(3)
    expect(cursor(1, action, tree)).toEqual(3)
    expect(cursor(2, action, tree)).toEqual(2)
    expect(cursor(3, action, tree)).toEqual(3)
  })

  it('should handle SELECT_MOVE', () => {
    const NON_EXIST_NODE = 123123
    expect(cursor(0, selectMove(0), tree)).toEqual(0)
    expect(cursor(0, selectMove(1), tree)).toEqual(1)
    expect(cursor(0, selectMove(2), tree)).toEqual(2)
    expect(cursor(0, selectMove(3), tree)).toEqual(3)
    expect(cursor(0, selectMove(NON_EXIST_NODE), tree)).toEqual(0)
  })
})
