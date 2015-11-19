import expect from 'expect';

import nodes, { initialState } from '../../src/reducers/nodes';
import { LOAD_SGF } from '../../src/constants/actions';

describe('nodes reducer', () => {
  it('should handle initial state', () => {
    expect(nodes(undefined, {})).toEqual(initialState)
  })

  it('should handle LOAD_SGF', () => {
    expect(nodes({}, {
      type: LOAD_SGF,
      payload: '(;FF[4];B[aa];W[bb](;B[cc];W[bd])(;B[hh]))'
    })).toEqual({
      0: { id: 0, props: { FF: '4' }, childs: [1] },
      1: { id: 1, parent: 0, props: { B: 'aa' }, childs: [2] },
      2: { id: 2, parent: 1, props: { W: 'bb' }, childs: [3, 5] },
      3: { id: 3, parent: 2, props: { B: 'cc' }, childs: [4] },
      4: { id: 4, parent: 3, props: { W: 'bd' }, childs: [] },
      5: { id: 5, parent: 2, props: { B: 'hh' }, childs: [] },
    })
  })
});
